import * as React from "react";
import {useEffect, useState} from "react";
import {Card, CardContent, Container, Grid, Typography} from "@mui/material";
import {request} from "../../../../api/axios"; // Adjust import path if necessary

export default function ShowOrder(props) {
    const {id} = props;
    const [order, setOrder] = useState({
        code: "",
        payment_method_type: "",
        payment_status: "",
        shipping_cost: "",
        status: "",
        tax: "",
        to_address: "",
        to_name: "",
        to_phone: "",
        total_quantity: 0,
        total_pay: 0,
        orderVariants: [],
        user: [],
    });

    const statusMap = {
        1: "Chờ thanh toán",
        2: "Đã thanh toán",
        3: "Đang vận chuyển",
        4: "Đã giao hàng",
        5: "Đã hủy",
        6: "Hoàn tất"
    };

    const paymentStatusMap = {
        0: "Chưa chuyển khoản",
        1: "Đã chuyển khoản",
    };


    useEffect(() => {
        const fetchOrderAndUser = async () => {
            try {
                const orderResponse = await request("GET", `/api/orders/${id}`);
                const fetchedOrder = orderResponse.data.payload;

                setOrder({
                    code: fetchedOrder.code,
                    payment_method_type: fetchedOrder.paymentMethodType,
                    payment_status: paymentStatusMap[fetchedOrder.paymentStatus],
                    shipping_cost: fetchedOrder.shippingCost,
                    status: statusMap[fetchedOrder.status],
                    tax: fetchedOrder.tax,
                    to_address: fetchedOrder.toAddress,
                    to_name: fetchedOrder.toName,
                    to_phone: fetchedOrder.toPhone,
                    total_quantity: fetchedOrder.orderVariants.reduce((sum, variant) => sum + variant.quantity, 0),
                    total_pay: fetchedOrder.totalPay,
                    orderVariants: fetchedOrder.orderVariants,
                    user: fetchedOrder.user,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchOrderAndUser();
    }, [id]);

    return (
        <Container fixed>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Mã đơn hàng:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.code}</Typography>
                    </Card>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Phương thức thanh toán:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.payment_method_type}</Typography>
                    </Card>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Trạng thái thanh toán:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.payment_status}</Typography>
                    </Card>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Tên khách hàng:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.user.name}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Phí vận chuyển:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.shipping_cost}</Typography>
                    </Card>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Trạng thái đơn hàng:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.status}</Typography>
                    </Card>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Thuế:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.tax} đ</Typography>
                    </Card>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Tổng số lượng:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.total_quantity}</Typography>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Địa chỉ nhận hàng:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.to_address}</Typography>
                    </Card>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Tên người nhận:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.to_name}</Typography>
                    </Card>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Số điện thoại:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.to_phone}</Typography>
                    </Card>
                    <Card sx={{m: 1, p: 2}}>
                        <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Tổng thanh toán:</Typography>
                        <Typography sx={{fontSize: "16px"}}>{order.total_pay} đ</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{fontSize: "20px", fontWeight: "bold"}}>Các sản phẩm trong đơn hàng:</Typography>
                            {order.orderVariants.map((variant, index) => (
                                <Grid container key={index} spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography sx={{fontSize: "16px"}}>Sản phẩm: {variant.variant.product.name}</Typography>
                                        <Typography sx={{fontSize: "16px"}}>Mã SKU: {variant.variant.sku}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={{fontSize: "16px"}}>Giá: {variant.price} đ</Typography>
                                        <Typography sx={{fontSize: "16px"}}>Số lượng: {variant.quantity}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={{fontSize: "16px"}}>Số tiền: {variant.amount} đ</Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
