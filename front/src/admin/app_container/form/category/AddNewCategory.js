import * as React from "react";
import {useContext, useState} from "react";
import {Button, CircularProgress, Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import {request} from "../../../../api/axios";
import {DataTableContext} from "../../../TableContext";

export default function AddNewCategory(props) {
    const {setOpen} = props;
    const {setDataChange} = useContext(DataTableContext);

    const [category, setCategory] = useState({
        name: "",
        slug: "",
        description: "",
        thumbnail: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên phân loại sản phẩm"),
        description: Yup.string().required("Vui lòng nhập mô tả"),
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
            ...(name === "name" && {slug: value.toLowerCase().replace(/\s+/g, "-")}),
        }));
    };

    const handleAdd = async () => {
        setDataChange(false);
        try {
            await validationSchema.validate(category, {abortEarly: false});
            setErrors({});

            const updateCategory = {
                name: category.name,
                slug: category.slug,
                description: category.description,
                thumbnail: category.thumbnail,
            };

            request("POST", "/api/categories", updateCategory)
                .then((response) => {
                    if (response.status === 201) {
                        setDataChange(true);
                        alert("Phân loại sản phẩm đã được thêm thành công");
                        setOpen(false);
                    } else {
                        console.error("Error updating service:", response.statusText);
                        alert("Thêm phân loại sản phẩm thất bại");
                        setOpen(false);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Có lỗi xảy ra");
                    setOpen(false);
                });
        } catch (err) {
            setErrors(err.inner.reduce((acc, error) => ({...acc, [error.path]: error.message}), {}));
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true); // Start loading indicator
        const formData = new FormData();
        formData.append("image", file);
        formData.append("folder", "category");

        request("POST", "/cloudinary-api/images/upload-single", formData,
            {
                "Content-Type": "multipart/form-data"
            })
            .then((response) => {
                if (response.status === 200) {
                    setCategory((prevCategory) => ({
                        ...prevCategory,
                        thumbnail: response.data.payload.path,
                    }));
                } else {
                    alert("Tải ảnh thất bại");
                }
            })
            .catch((error) => {
                console.error("Upload Error:", error);
                alert("Có lỗi xảy ra khi tải ảnh");
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    return (
        <Container fixed>
            <Grid container columnSpacing={3}>
                <Grid item xs={6}>
                    <TextField
                        sx={{
                            m: 1,
                            width: "100%",
                            "& .MuiInputBase-input": {
                                caretColor: "black",
                            }
                        }}
                        id="outlined-basic1"
                        label="Tên phân loại sản phẩm"
                        variant="outlined"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        required
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        sx={{
                            m: 1,
                            width: "100%",
                            "& .MuiInputBase-input": {
                                caretColor: "black",
                            }
                        }}
                        id="outlined-basic2"
                        label="Slug"
                        variant="outlined"
                        name="slug"
                        value={category.slug}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{
                            m: 1,
                            width: "100%",
                            "& .MuiInputBase-input": {
                                caretColor: "black",
                            }
                        }}
                        id="outlined-basic4"
                        label="Mô tả"
                        multiline
                        rows={4}
                        variant="outlined"
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                        required
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            m: 1,
                            width: "100%",
                            "& .MuiInputBase-input": {
                                caretColor: "black",
                            }
                        }}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{color: "white"}}/>
                        ) : (
                            "Tải ảnh"
                        )}
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileUpload}
                        />
                    </Button>
                    {category.thumbnail && !loading && (
                        <img
                            src={category.thumbnail}
                            alt="Thumbnail Preview"
                            style={{
                                marginTop: "10px",
                                width: "100%",
                                height: "auto",
                                maxHeight: "200px",
                                objectFit: "contain",
                            }}
                        />
                    )}
                    {errors.thumbnail && (
                        <span style={{color: "red", fontSize: "12px"}}>
                            {errors.thumbnail}
                        </span>
                    )}
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleAdd}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? <CircularProgress size={24} sx={{color: "white"}}/> : "Lưu"}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
