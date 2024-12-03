import React, {useContext, useEffect, useState} from "react";
import {Button, CircularProgress, Container, Grid, TextField, Typography,} from "@mui/material";
import {DataTableContext} from "../../../TableContext";
import * as Yup from "yup";
import {request} from "../../../../api/axios";

export default function UpdateProduct(props) {
    const {setOpen, id} = props; // id will be passed for updating
    const {setDataChange} = useContext(DataTableContext);

    const [product, setProduct] = useState({
        id: id || "",
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
        // Fetch brands and categories
        request("get", "/api/brands")
            .then((response) => setBrands(response.data.payload.content || []))
            .catch((error) => console.error("Error fetching brands:", error));

        request("get", "/api/categories")
            .then((response) => setCategories(response.data.payload.content || []))
            .catch((error) => console.error("Error fetching categories:", error));

        // Fetch product data if updating an existing product
        if (id) {
            request("get", `/api/products/${id}`)
                .then((response) => {
                    const data = response.data.payload;
                    setProduct({
                        ...data,
                        categoryIds: data.categories.map((category) => category.id),
                    });
                })
                .catch((error) => console.error("Error fetching product:", error));
        }
        console.log(product);
    }, [id]);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
        description: Yup.string().required("Vui lòng nhập mô tả"),
        brandId: Yup.string().required("Vui lòng chọn thương hiệu"),
        categoryIds: Yup.array().min(1, "Vui lòng chọn ít nhất một phân loại sản phẩm"),
        variants: Yup.array().of(
            Yup.object().shape({
                color: Yup.string().required("Vui lòng nhập màu sắc"),
                size: Yup.string().required("Vui lòng nhập kích thước"),
                price: Yup.number().required("Vui lòng nhập giá").min(0, "Giá không thể nhỏ hơn 0"),
            })
        ),
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "name" && {slug: value.toLowerCase().replace(/\s+/g, "-")}),
        }));
    };

    const handleVariantChange = (index, event) => {
        const {name, value} = event.target;
        setProduct((prev) => {
            const newVariants = [...prev.variants];
            newVariants[index] = {
                ...newVariants[index],
                [name]: value,
            };
            return {...prev, variants: newVariants};
        });
    };

    const addVariant = () => {
        setProduct((prev) => ({
            ...prev,
            variants: [...prev.variants, {color: "", size: "", price: 0}],
        }));
    };

    const removeVariant = (index) => {
        setProduct((prev) => {
            const newVariants = prev.variants.filter((_, idx) => idx !== index);
            return {...prev, variants: newVariants};
        });
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
        setLoading(true);
        setDataChange(false);
        try {
            await validationSchema.validate(product, { abortEarly: false });
            setErrors({});
            const formattedProduct = {
                ...product,
                specifications: product.specifications || null,
                variants: product.variants.map((variant) => ({
                    ...variant,
                    cost: variant.cost || 0,
                    price: variant.price || 0,
                    properties: variant.properties || {},
                    status: 1,
                })),
            };

            const requestMethod = product.id ? "put" : "post";
            const url = product.id ? `/api/products/${product.id}` : "/api/products";

            request(requestMethod, url, formattedProduct)
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        alert("Sản phẩm đã được lưu thành công");
                        setDataChange(true);
                        setOpen(false);
                    } else {
                        alert("Có lỗi xảy ra");
                        setOpen(false);
                    }
                })
                .catch((error) => {
                    console.error("Error updating product:", error);
                    alert("Có lỗi xảy ra khi lưu sản phẩm");
                    setOpen(false);
                });
        } catch (validationErrors) {
            const errorObject = validationErrors.inner.reduce(
                (acc, error) => ({ ...acc, [error.path]: error.message }),
                {}
            );
            setErrors(errorObject);
        }
        setLoading(false);
    };

    return (
        <Container fixed>
            <Grid container spacing={3} sx={{m: 1, width: "100%", "& .MuiInputBase-input": {caretColor: "black"}}}>
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
                    <Typography variant="h6">Thông tin biến thể sản phẩm</Typography>
                    {product.variants.map((variant, index) => (
                        <Grid container spacing={2} key={index}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Màu sắc"
                                    name={`variants[${index}].color`}
                                    value={variant.color || ""}
                                    onChange={(e) => handleVariantChange(index, e)}
                                    error={!!errors[`variants[${index}].color`]}
                                    helperText={errors[`variants[${index}].color`]}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Kích thước"
                                    name={`variants[${index}].size`}
                                    value={variant.size || ""}
                                    onChange={(e) => handleVariantChange(index, e)}
                                    error={!!errors[`variants[${index}].size`]}
                                    helperText={errors[`variants[${index}].size`]}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Giá"
                                    name={`variants[${index}].price`}
                                    type="number"
                                    value={variant.price || ""}
                                    onChange={(e) => handleVariantChange(index, e)}
                                    error={!!errors[`variants[${index}].price`]}
                                    helperText={errors[`variants[${index}].price`]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => removeVariant(index)}
                                >
                                    Xóa biến thể
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                    <Button variant="contained" onClick={addVariant}>
                        Thêm biến thể
                    </Button>
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
