import * as React from "react";
import { useContext, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import * as Yup from "yup";
import {request} from "../../../../api/axios";
import {DataTableContext} from "../../../TableContext";

export default function AddNewCategory(props) {
    const { setOpen } = props;
    const { setDataChange } = useContext(DataTableContext);

    const [category, setCategory] = useState({
        name: "",
        slug: "",
        description: "",
        thumbnail: "",
    });

    const [errors, setErrors] = useState({}); // State to store validation errors

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng nhập tên phân loại sản phẩm"),
        slug: Yup.string().required("Vui lòng nhập slug"),
        description: Yup.string().required("Vui lòng nhập mô tả"),
        thumbnail: Yup.string().url("Vui lòng nhập URL hợp lệ").required("Vui lòng nhập hình ảnh thumbnail"),
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    };

    const handleAdd = async () => {
        setDataChange(false);
        try {
            await validationSchema.validate(category, { abortEarly: false }); // Validate all fields at once
            setErrors({}); // Clear any previous errors if validation passes
            request("POST", "/api/categories")
                .then((response) => {
                    if (response.status === 201) {
                        setDataChange(true);
                        alert("Phân loại sản phẩm đã được thêm hoặc cập nhật thành công");
                        setOpen(false);
                    } else {
                        console.error("Error updating service:", response.statusText);
                        alert("Thêm hoặc cập nhật phân loại sản phẩm thất bại");
                        setOpen(false);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("Có lỗi xảy ra");
                    setOpen(false);
                });
        } catch (err) {
            // Set errors from Yup validation
            setErrors(err.inner.reduce((acc, error) => ({ ...acc, [error.path]: error.message }), {}));
        }
    };

    return (
        <Container fixed>
            <Grid container columnSpacing={3}>
                <Grid item xs={6}>
                    <TextField
                        sx={{ m: 1, width: "100%" }}
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
                    <TextField
                        sx={{ m: 1, width: "100%" }}
                        id="outlined-basic2"
                        label="Slug"
                        variant="outlined"
                        name="slug"
                        value={category.slug}
                        onChange={handleChange}
                        required
                        error={!!errors.slug}
                        helperText={errors.slug}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        sx={{ m: 1, width: "100%" }}
                        id="outlined-basic3"
                        label="Thumbnail URL"
                        variant="outlined"
                        name="thumbnail"
                        value={category.thumbnail}
                        onChange={handleChange}
                        required
                        error={!!errors.thumbnail}
                        helperText={errors.thumbnail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ m: 1, width: "100%" }}
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
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button variant="contained" color="success" onClick={() => handleAdd()}>
                        Lưu
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
