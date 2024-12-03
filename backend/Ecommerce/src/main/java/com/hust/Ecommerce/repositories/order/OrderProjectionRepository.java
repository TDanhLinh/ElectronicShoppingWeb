package com.hust.Ecommerce.repositories.order;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.hust.Ecommerce.dtos.statistic.StatisticOrderResource;
import com.hust.Ecommerce.entities.order.Order;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class OrderProjectionRepository {

    private EntityManager em;

    public List<StatisticOrderResource> getOrderCountByCreateDate() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StatisticOrderResource> query = cb.createQuery(StatisticOrderResource.class);

        Root<Order> order = query.from(Order.class);
        query.select(cb.construct(StatisticOrderResource.class,
                order.get("createdAt").as(Instant.class),
                cb.count(order.get("id")).as(Long.class),
                cb.sum(order.get("totalAmount")).as(Long.class),
                cb.sum(order.get("totalPay")).as(Long.class)

        ));
        query.groupBy(order.get("createdAt"));
        query.orderBy(cb.asc(order.get("createdAt")));

        return em.createQuery(query).getResultList();
    }

}
