package com.hust.Ecommerce.services.statistic;

import org.springframework.stereotype.Service;

import com.hust.Ecommerce.dtos.statistic.StatisticResponse;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StatisticServiceImpl implements StatisticService {

    @Override
    public StatisticResponse getStatistic() {
        StatisticResponse statisticResponse = new StatisticResponse();
        throw new UnsupportedOperationException("Unimplemented method 'getStatistic'");
    }

}
