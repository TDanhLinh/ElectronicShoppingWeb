import * as React from "react";
import {useEffect, useState} from "react";
import {Grid, TextField, Button} from "@mui/material";
import Container from "@mui/material/Container";
import {request} from "../../../../api/axios";

export default function ShowOrder(props) {
    const {id} = props;
    const [order, setOrder] = useState({
        user_id: "",
        code: "",
        payment_method_type: "",
        payment_status: "",
        shipping_cost: "",
        status: "",
        tax: "",
        to_address: "",
        to_name: "",
        to_phone: "",
        total_amount: "",
        total_pay: "",
        vnpay_order_status: "",
    });
    const [user, setUser] = useState({name: ""}); // Default user state

    useEffect(() => {
        const fetchOrderAndUser = async () => {
            try {
                // Fetch the order
                const orderResponse = await request("GET", `/api/orders/${id}`);
                const fetchedOrder = orderResponse.data.payload.content;
                setOrder(fetchedOrder);

                // Fetch the user using the order's user_id
                const userResponse = await request("GET", `/api/users/${fetchedOrder.user_id}`);
                setUser(userResponse.data.payload.content);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOrderAndUser();
    }, [id]);

    const handleChange = (field, value) => {
        setOrder((prev) => ({...prev, [field]: value}));
    };

    const updateOrder = async () => {
        try {
            await request("PUT", `/api/orders/${id}`, order);
            alert("Order updated successfully!");
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Failed to update the order.");
        }
    };

    return (
        <Container fixed>
            <Grid container columnSpacing={3}>
                <Grid item xs={4}>
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-code"
                        label="Order Code"
                        variant="outlined"
                        value={order.code}
                        onChange={(e) => handleChange("code", e.target.value)}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-payment-method"
                        label="Payment Method Type"
                        variant="outlined"
                        value={order.payment_method_type}
                        onChange={(e) => handleChange("payment_method_type", e.target.value)}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-payment-status"
                        label="Payment Status"
                        variant="outlined"
                        value={order.payment_status}
                        onChange={(e) => handleChange("payment_status", e.target.value)}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-user-name"
                        label="User Name"
                        variant="outlined"
                        value={user.name}
                        InputProps={{readOnly: true}}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-shipping-cost"
                        label="Shipping Cost"
                        variant="outlined"
                        value={order.shipping_cost}
                        onChange={(e) => handleChange("shipping_cost", e.target.value)}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-status"
                        label="Order Status"
                        variant="outlined"
                        value={order.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-tax"
                        label="Tax"
                        variant="outlined"
                        value={order.tax}
                        onChange={(e) => handleChange("tax", e.target.value)}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-total-amount"
                        label="Total Amount"
                        variant="outlined"
                        value={order.total_amount}
                        onChange={(e) => handleChange("total_amount", e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-to-address"
                        label="To Address"
                        variant="outlined"
                        value={order.to_address}
                        onChange={(e) => handleChange("to_address", e.target.value)}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-to-name"
                        label="To Name"
                        variant="outlined"
                        value={order.to_name}
                        onChange={(e) => handleChange("to_name", e.target.value)}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-to-phone"
                        label="To Phone"
                        variant="outlined"
                        value={order.to_phone}
                        onChange={(e) => handleChange("to_phone", e.target.value)}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-total-pay"
                        label="Total Pay"
                        variant="outlined"
                        value={order.total_pay}
                        onChange={(e) => handleChange("total_pay", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-notes"
                        label="VNPAY Order Status"
                        multiline
                        variant="outlined"
                        value={order.vnpay_order_status}
                        onChange={(e) => handleChange("vnpay_order_status", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" sx={{m: 1}} onClick={updateOrder}>
                        Update Order
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
