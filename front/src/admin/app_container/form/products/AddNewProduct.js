import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, Autocomplete, Grid, Container } from "@mui/material";
import { DataTableContext } from "../../../TableContext";
import * as Yup from "yup";
import { request } from "../../../../api/axios";

export default function AddNewProduct(props) {
    const { setOpen } = props;
    const { setDataChange } = useContext(DataTableContext);

    const [product, setProduct] = useState({
        name: "",
        slug: "",
        description: "",
        thumbnail: "",
        status: 1,
        brandId: "",
        categoryIds: [],
        images: [],
        variants: [],
    });

    const [errors, setErrors] = useState({});
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newVariant, setNewVariant] = useState({});

    useEffect(() => {
        // Fetch brands
        request("get", "/api/brands").then((response) => {
            setBrands(response.data.payload.content || []);
        }).catch((error) => {
            console.error("Error fetching brands:", error);
        });

        // Fetch categories
        request("get", "/api/categories").then((response) => {
            setCategories(response.data.payload.content || []);
        }).catch((error) => {
            console.error("Error fetching categories:", error);
        });
    }, []);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên sản phẩm"),
        description: Yup.string().required("Vui lòng nhập mô tả"),
        brandId: Yup.string().required("Vui lòng chọn thương hiệu"),
        categoryIds: Yup.array().min(1, "Vui lòng chọn ít nhất một phân loại sản phẩm"),
        thumbnail: Yup.string().required("Vui lòng tải ảnh đại diện"),
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "name" ? value : value.trim(),
            ...(name === "name" && { slug: value.toLowerCase().replace(/\s+/g, "-") }),
        }));
    };

    const handleFileUpload = async (event, isMultiple = false) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const formData = new FormData();
        for (const file of files) {
            formData.append("image", file);
        }

        try {
            const response = await request(
                "post",
                `/api/images/${isMultiple ? "upload-multiple" : "upload-single"}`,
                formData
            );
            const uploadedPaths = isMultiple
                ? response.data.payload.map((img) => img.path)
                : [response.data.payload.path];

            setProduct((prev) => ({
                ...prev,
                images: isMultiple ? [...prev.images, ...uploadedPaths] : prev.images,
                ...(isMultiple || { thumbnail: uploadedPaths[0] }),
            }));
        } catch (error) {
            console.error("Image Upload Error:", error);
            alert("Có lỗi xảy ra khi tải ảnh");
        }
    };

    const handleAddVariant = () => {
        if (Object.keys(newVariant).length === 0) return;
        setProduct((prev) => ({
            ...prev,
            variants: [...prev.variants, { ...newVariant, status: 1 }],
        }));
        setNewVariant({});
    };

    const handleSubmit = async () => {
        try {
            await validationSchema.validate(product, { abortEarly: false });
            setErrors({});
            request("post", "/api/products", product).then((response) => {
                if (response.status === 201) {
                    alert("Thêm sản phẩm thành công");
                    setDataChange(true);
                    setOpen(false);
                } else {
                    alert("Có lỗi xảy ra");
                }
            }).catch((error) => {
                console.error("Error creating product:", error);
                alert("Có lỗi xảy ra khi thêm sản phẩm");
            });
        } catch (validationErrors) {
            const errorObject = validationErrors.inner.reduce(
                (acc, error) => ({ ...acc, [error.path]: error.message }),
                {}
            );
            setErrors(errorObject);
        }
    };

    return (
        <Container fixed>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Tên sản phẩm"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        fullWidth
                        multiline
                        label="Mô tả"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <Autocomplete
                        options={brands}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => setProduct((prev) => ({ ...prev, brandId: value?.id }))}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Thương hiệu"
                                error={!!errors.brandId}
                                helperText={errors.brandId}
                            />
                        )}
                    />
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
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                    >
                        Upload Thumbnail
                        <input type="file" hidden accept="image/*" onChange={(e) => handleFileUpload(e)} />
                    </Button>
                    {product.thumbnail && (
                        <img
                            src={product.thumbnail}
                            alt="Thumbnail Preview"
                            style={{ marginTop: 10, width: "100%", maxHeight: 200, objectFit: "cover" }}
                        />
                    )}
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Upload Additional Images
                        <input type="file" hidden multiple accept="image/*" onChange={(e) => handleFileUpload(e, true)} />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Thuộc tính mới (JSON)"
                        value={JSON.stringify(newVariant)}
                        onChange={(e) => setNewVariant(JSON.parse(e.target.value || "{}"))}
                    />
                    <Button onClick={handleAddVariant} variant="outlined">
                        Thêm thuộc tính
                    </Button>
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button variant="contained" onClick={handleSubmit}>
                        Lưu sản phẩm
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
