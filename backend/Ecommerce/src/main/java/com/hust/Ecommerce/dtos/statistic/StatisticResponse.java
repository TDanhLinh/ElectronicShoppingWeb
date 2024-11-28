package com.hust.Ecommerce.dtos.statistic;

import java.util.List;

import lombok.Data;

@Data
public class StatisticResponse {
    private Integer totalCustomer;
    private Integer totalProduct;
    private Integer totalOrder;
    private Integer totalReview;
    private Integer totalBrand;
    private List<StatisticResource> statisticRegistration;
    private List<StatisticResource> statisticOrder;
    private List<StatisticResource> statisticReview;

}
