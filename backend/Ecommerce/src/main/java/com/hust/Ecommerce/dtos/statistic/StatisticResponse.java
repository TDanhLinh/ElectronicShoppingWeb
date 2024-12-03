package com.hust.Ecommerce.dtos.statistic;

import java.util.List;

import lombok.Data;

@Data
public class StatisticResponse {
    // tong so khach hang da dang ky(da activated)
    private Integer totalCustomer;
    // tong so san pham
    private Integer totalProduct;
    // tong so order thanh cong (status = 6)
    private Integer totalOrder;
    // tong so review
    private Integer totalReview;
    // tong nhan hieu
    private Integer totalBrand;

    // phan tich order
    private List<StatisticOrderResource> statisticOrder;
}
