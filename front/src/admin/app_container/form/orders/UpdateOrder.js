import * as React from "react";
import {useContext, useEffect, useState} from "react";
import { Grid, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Container from "@mui/material/Container";
import { request } from "../../../../api/axios";
import {DataTableContext} from "../../../TableContext";

export default function ShowOrder(props) {
    const { setOpen, id } = props;
    const [order, setOrder] = useState({
        status: "",
    });

    const [status, setStatus] = useState("");
    const {setDataChange} = useContext(DataTableContext);

    // Map of status numbers to labels
    const statusMap = {
        1: "Chờ thanh toán",
        2: "Đã thanh toán",
        3: "Đang vận chuyển",
        4: "Đã giao hàng",
        5: "Đã hủy",
        6: "Hoàn tất",
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // Fetch the order
                const orderResponse = await request("GET", `/api/orders/${id}`);
                const fetchedOrder = orderResponse.data.payload;
                setOrder(fetchedOrder);
                setStatus(fetchedOrder.status);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOrder();
    }, [id]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const updateOrderStatus = async () => {
        setDataChange(false);
        try {
            // Send only the status field
            const requestBody = {
                status: parseInt(status),
            };

            await request("PUT", `/api/orders/${id}`, requestBody);
            alert("Order status updated successfully!");
            setOpen(false);
            setDataChange(true);
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Failed to update the order status.");
            setOpen(false);
        }
    };

    return (
        <Container fixed>
            <Grid container columnSpacing={3}>
                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                        <InputLabel>Order Status</InputLabel>
                        <Select
                            value={status}
                            onChange={handleStatusChange}
                            label="Order Status"
                        >
                            {Object.entries(statusMap).map(([key, value]) => (
                                <MenuItem key={key} value={key}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" sx={{ m: 1 }} onClick={updateOrderStatus}>
                        Update Status
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
