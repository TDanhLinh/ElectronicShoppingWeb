import React, {useContext, useEffect, useState} from "react";
import {
    Autocomplete,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import {DataTableContext} from "../../../TableContext";
import * as Yup from "yup";
import {request} from "../../../../api/axios";

export default function AddNewProduct(props) {
    const {setOpen} = props;
    const {setDataChange} = useContext(DataTableContext);

    const [product, setProduct] = useState({
        name: "",
        slug: "",
        description: "",
        status: 1,
        brandId: "",
        categoryIds: [],
        images: [],
        variants: [],
        unit: "$",
        weight: 0,
        specifications: null,
        warrantyDuration: 0,
    });

    const [errors, setErrors] = useState({});
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        request("get", "/api/brands")
            .then((response) => setBrands(response.data.payload.content || []))
            .catch((error) => console.error("Error fetching brands:", error));

        request("get", "/api/categories")
            .then((response) => setCategories(response.data.payload.content || []))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
        description: Yup.string().required("Vui lòng nhập mô tả"),
        brandId: Yup.string().required("Vui lòng chọn thương hiệu"),
        categoryIds: Yup.array().min(1, "Vui lòng chọn ít nhất một phân loại sản phẩm"),
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "name" && {slug: value.toLowerCase().replace(/\s+/g, "-")}),
        }));
    };

    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setLoading(true);
        const formData = new FormData();
        for (const file of files) {
            formData.append("images", file);
        }
        formData.append("folder", "products");

        try {
            const response = await request(
                "post",
                `/cloudinary-api/images/upload-multiple`,
                formData,
                {"Content-Type": "multipart/form-data"}
            );

            if (response.status === 200) {
                const uploadedPaths = response.data.payload.content.map((img, index) => ({
                    path: img.path,
                    contentType: img.contentType,
                    name: img.name,
                    size: img.size,
                    isThumbnail: index === 0,
                }));

                setProduct((prev) => ({
                    ...prev,
                    images: [...prev.images, ...uploadedPaths],
                }));
                setLoading(false);
            } else {
                alert("Image upload failed");
            }
        } catch (error) {
            console.error("Image Upload Error:", error);
            alert("Có lỗi xảy ra khi tải ảnh");
        }
    };

    const handleThumbnailChange = (index) => {
        setProduct((prev) => ({
            ...prev,
            images: prev.images.map((img, imgIndex) => ({
                ...img,
                isThumbnail: imgIndex === index,
            })),
        }));
    };

    const handleSubmit = async () => {
        setDataChange(false);
        try {
            await validationSchema.validate(product, {abortEarly: false});
            setErrors({});
            const formattedProduct = {
                ...product,
                specifications: product.specifications || null,
                status: 1,
                variants: product.variants.map((variant) => ({
                    ...variant,
                    cost: variant.cost || 0,
                    price: variant.price || 0,
                    properties: variant.properties || {},
                    status: 1,
                })),
            };

            console.log(formattedProduct);
            request("post", "/api/products", formattedProduct)
                .then((response) => {
                    if (response.status === 201) {
                        alert("Thêm sản phẩm thành công");
                        setDataChange(true);
                        setOpen(false);
                    } else {
                        alert("Có lỗi xảy ra");
                        setOpen(false);
                    }
                })
                .catch((error) => {
                    console.error("Error creating product:", error);
                    alert("Có lỗi xảy ra khi thêm sản phẩm");
                    setOpen(false);
                });
        } catch (validationErrors) {
            const errorObject = validationErrors.inner.reduce(
                (acc, error) => ({...acc, [error.path]: error.message}),
                {}
            );
            setErrors(errorObject);
        }
    };

    return (
        <Container fixed>
            <Grid container spacing={3} sx={{
                m: 1,
                width: "100%",
                "& .MuiInputBase-input": {
                    caretColor: "black",
                }
            }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Tên sản phẩm"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={6}
                        label="Mô tả sản phẩm"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Trọng lượng"
                        name="weight"
                        type="number"
                        value={product.weight || ""}
                        onChange={handleInputChange}
                        error={!!errors.weight}
                        helperText={errors.weight}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Đơn vị"
                        name="unit"
                        value={product.unit || ""}
                        onChange={handleInputChange}
                        error={!!errors.unit}
                        helperText={errors.unit}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Thời gian bảo hành (tháng)"
                        name="warrantyDuration"
                        type="number"
                        value={product.warrantyDuration || ""}
                        onChange={handleInputChange}
                        error={!!errors.warrantyDuration}
                        helperText={errors.warrantyDuration}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={brands}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => setProduct((prev) => ({...prev, brandId: value?.id}))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Thương hiệu"
                                error={!!errors.brandId}
                                helperText={errors.brandId}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        multiple
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) =>
                            setProduct((prev) => ({
                                ...prev,
                                categoryIds: value.map((category) => category.id),
                            }))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Phân loại sản phẩm"
                                error={!!errors.categoryIds}
                                helperText={errors.categoryIds}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>
                                Các biến thể:
                            </Typography>
                            {product.variants.map((variant, index) => (
                                <Grid container spacing={2} key={index} sx={{marginBottom: "1.5rem"}}>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Tên sản phẩm"
                                            value={variant.name || ""}
                                            onChange={(e) =>
                                                setProduct((prev) => {
                                                    const updatedVariants = [...prev.variants];
                                                    updatedVariants[index].name = e.target.value;
                                                    return {...prev, variants: updatedVariants};
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Mã SKU"
                                            value={variant.sku || ""}
                                            onChange={(e) =>
                                                setProduct((prev) => {
                                                    const updatedVariants = [...prev.variants];
                                                    updatedVariants[index].sku = e.target.value;
                                                    return {...prev, variants: updatedVariants};
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Giá (VNĐ)"
                                            value={variant.price || ""}
                                            type="number"
                                            onChange={(e) =>
                                                setProduct((prev) => {
                                                    const updatedVariants = [...prev.variants];
                                                    updatedVariants[index].price = Number(e.target.value);
                                                    return {...prev, variants: updatedVariants};
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            label="Số lượng"
                                            value={variant.quantity || ""}
                                            type="number"
                                            onChange={(e) =>
                                                setProduct((prev) => {
                                                    const updatedVariants = [...prev.variants];
                                                    updatedVariants[index].quantity = Number(e.target.value);
                                                    return {...prev, variants: updatedVariants};
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={{fontSize: "16px", marginTop: 2}}>
                                            Tổng giá trị: {variant.quantity * variant.price || 0} đ
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{marginTop: 2}}
                                            onClick={() =>
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    variants: prev.variants.filter((_, i) => i !== index),
                                                }))
                                            }
                                        >
                                            Xóa
                                        </Button>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{marginTop: 2}}
                                onClick={() =>
                                    setProduct((prev) => ({
                                        ...prev,
                                        variants: [...prev.variants, {name: "", sku: "", price: 0, quantity: 0}],
                                    }))
                                }
                            >
                                Thêm sản phẩm
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24}/> : "Chèn ảnh"}
                        <input type="file" hidden multiple accept="image/*" onChange={handleFileUpload}/>
                    </Button>

                    {product.images.length > 0 && (
                        <Grid container spacing={2} style={{marginTop: 10}}>
                            {product.images.map((img, index) => (
                                <Grid item xs={4} key={index}>
                                    <img
                                        src={img.path}
                                        alt={`Image ${index + 1}`}
                                        style={{
                                            marginTop: "10px",
                                            width: "100%",
                                            height: "auto",
                                            maxHeight: "200px",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <Button
                                        variant="outlined"
                                        color={img.isThumbnail ? "success" : "primary"}
                                        fullWidth
                                        onClick={() => handleThumbnailChange(index)}
                                        sx={{marginTop: 1}}
                                    >
                                        {img.isThumbnail ? "Thumbnail hiện tại" : "Đặt làm Thumbnail"}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button variant="contained" onClick={handleSubmit}>
                        {loading ? <CircularProgress size={24} sx={{color: "white"}}/> : "Lưu sản phẩm"}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
