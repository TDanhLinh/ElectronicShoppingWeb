import React, {useContext, useEffect, useState} from "react";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {DataTableContext} from "../../../TableContext";
import {request} from "../../../../api/axios";

export default function UpdateRole(props) {
    const {setOpen, id} = props;
    const {setDataChange} = useContext(DataTableContext);
    const [account, setAccount] = useState([]);
    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch current role of the user
        request("GET", `/api/users/${id}`)
            .then((response) => {
                const user = response.data.payload;
                setAccount(user);
                setRole(user.role.name);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [id]);

    const handleUpdate = async () => {
        setDataChange(false);

        if (!role) {
            setErrors({role: "Không được để trống"});
            return;
        }

        setErrors({});

        const updatedAccount = {
            email: account.email,
            name: account.name,
            phoneNumber: account.phoneNumber,
            gender: account.gender,
            status: account.status,
            address: account.address,
            avatar: account.avatar,
            language: account.language,
            role: role,
        };

        // Make PUT request to update the role
        request("PUT", `/api/users/${id}`, JSON.stringify(updatedAccount))
            .then((response) => {
                if (response.status === 200) {
                    setDataChange(true);
                    setOpen(false);
                    alert("Cập nhập thành công");
                } else {
                    alert("Cập nhập thất bại");
                }
            })
            .catch((error) => {
                console.error("Error updating role:", error);
                alert("Có lỗi xảy ra");
            });
    };

    return (
        <Container fixed>
            <Grid container rowSpacing={3} columnSpacing={3}>
                <Grid item xs={12}>
                    <TextField
                        select
                        sx={{m: 1, width: "100%"}}
                        label="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)} // Update role state
                        error={!!errors.role}
                        helperText={errors.role}
                        required
                    >
                        <MenuItem value="USER">USER</MenuItem>
                        <MenuItem value="STAFF">STAFF</MenuItem>
                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button variant="contained" color="success" onClick={handleUpdate}>
                        Cập nhập
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}