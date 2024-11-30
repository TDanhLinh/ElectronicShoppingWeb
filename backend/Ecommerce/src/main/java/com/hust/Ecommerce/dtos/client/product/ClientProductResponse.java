package com.hust.Ecommerce.dtos.client.product;

import java.util.List;

import com.hust.Ecommerce.dtos.client.ClientCategoryResponse;
import com.hust.Ecommerce.dtos.general.ImageResponse;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ClientProductResponse {
    private Long productId;
    private String productName;
    private String productSlug;
    private String productDescription;
    private String productThumbnail;
    private List<ImageResponse> productImages;
    private ClientCategoryResponse productCategory;
    private String productStatus;
    private Long warrantyDuration;

    private int productAverageRate;
    private int productCountReviews;

}
