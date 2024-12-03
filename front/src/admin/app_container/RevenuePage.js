import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import {request} from "../../api/axios";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RevenuePage() {
    const [stats, setStats] = React.useState({
        totalCustomer: 0,
        totalProduct: 0,
        totalOrder: 0,
        totalReview: 0,
        totalBrand: 0,
    });

    const [chartData, setChartData] = React.useState({
        labels: ['Khách hàng', 'Sản phẩm', 'Đơn hàng', 'Đánh giá', 'Thương hiệu'], // Categories for the chart in Vietnamese
        datasets: [{
            label: 'Tổng quan thống kê',
            data: [], // Data points for each category (e.g., totalCustomer, totalProduct)
            backgroundColor: [], // Dynamic colors for each bar
            borderColor: 'rgba(75,192,192,1)', // Border color for all bars
            borderWidth: 1,
        }]
    });

    // Fetch data from the API
    React.useEffect(() => {
        request("GET","/api/stats")
            .then((response) => {
                const data = response.data;
                setStats(data);

                // Define custom colors for each category
                const barColors = [
                    'rgba(75,192,192,0.4)', // Customer
                    'rgba(255,99,132,0.4)', // Product
                    'rgba(54,162,235,0.4)', // Order
                    'rgba(153,102,255,0.4)', // Review
                    'rgba(255,159,64,0.4)', // Brand
                ];

                // Update chart data based on the stats received
                setChartData({
                    labels: ['Khách hàng', 'Sản phẩm', 'Đơn hàng', 'Đánh giá', 'Thương hiệu'], // Static categories for the x-axis
                    datasets: [{
                        label: 'Tổng quan thống kê',
                        data: [
                            data.totalCustomer,
                            data.totalProduct,
                            data.totalOrder,
                            data.totalReview,
                            data.totalBrand,
                        ],
                        backgroundColor: barColors, // Apply the color array to each bar
                        borderColor: 'rgba(75,192,192,1)', // Border color for all bars
                        borderWidth: 1,
                    }]
                });
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
            });
    }, []);

    const statBox = (label, value) => (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: 2,
                width: '20%',
            }}
        >
            <Typography variant="h6">{label}</Typography>
            <Typography variant="h4" color="primary">{value}</Typography>
        </Box>
    );

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 3rem 1rem 3rem" }}>
                <h1>Doanh thu</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "1rem 3rem" }}>
                {statBox("Khách hàng", stats.totalCustomer)}
                {statBox("Sản phẩm", stats.totalProduct)}
                {statBox("Đơn hàng", stats.totalOrder)}
                {statBox("Đánh giá", stats.totalReview)}
                {statBox("Thương hiệu", stats.totalBrand)}
            </div>

            {/* Chart Section */}
            <div style={{ margin: "2rem 3rem" }}>
                <Typography variant="h5" gutterBottom>Tổng quan thống kê</Typography>
                <Bar data={chartData} options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Tổng quan về các chỉ số',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Danh mục',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Số lượng',
                            },
                            beginAtZero: true,
                        },
                    }
                }} />
            </div>
        </Paper>
    );
}
