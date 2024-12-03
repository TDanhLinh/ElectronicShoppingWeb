import * as React from "react";
import {useEffect, useState} from "react";
import {Grid, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {request} from "../../../../api/axios";

export default function ShowOrder(props) {
    const {id} = props; // Removed unused `functionName` prop
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
    const [user, setUser] = useState({ name: "" }); // Default user state

    useEffect(() => {
        const fetchOrderAndUser = async () => {
            try {
                // First fetch the order
                const orderResponse = await request("GET", `/api/orders/${id}`);
                const fetchedOrder = orderResponse.data.payload.content;
                setOrder(fetchedOrder);

                // Then fetch the user using the order's user_id
                const userResponse = await request("GET", `/api/users/${fetchedOrder.user_id}`);
                setUser(userResponse.data.payload.content);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOrderAndUser();
    }, [id]); // Dependency array includes `id`

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
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-payment-method"
                        label="Payment Method Type"
                        variant="outlined"
                        value={order.payment_method_type}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-payment-status"
                        label="Payment Status"
                        variant="outlined"
                        value={order.payment_status}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-user-name"
                        label="User Name"
                        variant="outlined"
                        value={user.name}
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-shipping-cost"
                        label="Shipping Cost"
                        variant="outlined"
                        value={order.shipping_cost}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-status"
                        label="Order Status"
                        variant="outlined"
                        value={order.status}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-tax"
                        label="Tax"
                        variant="outlined"
                        value={order.tax}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-total-amount"
                        label="Total Amount"
                        variant="outlined"
                        value={order.total_amount}
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-to-address"
                        label="To Address"
                        variant="outlined"
                        value={order.to_address}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-to-name"
                        label="To Name"
                        variant="outlined"
                        value={order.to_name}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-to-phone"
                        label="To Phone"
                        variant="outlined"
                        value={order.to_phone}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{m: 1, width: "100%"}}
                        id="outlined-total-pay"
                        label="Total Pay"
                        variant="outlined"
                        value={order.total_pay}
                        InputProps={{ readOnly: true }}
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
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
