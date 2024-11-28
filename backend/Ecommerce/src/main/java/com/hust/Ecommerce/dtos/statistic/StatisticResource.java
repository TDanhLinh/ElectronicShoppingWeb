package com.hust.Ecommerce.dtos.statistic;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticResource {
    private Instant date;
    private Long total;
}
