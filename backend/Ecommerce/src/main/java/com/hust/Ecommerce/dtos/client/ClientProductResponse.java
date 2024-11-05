package com.hust.Ecommerce.dtos.client;

import java.util.List;

import com.hust.Ecommerce.dtos.general.ImageResponse;
import com.hust.Ecommerce.dtos.inventory.InventoryRequest;

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
    private String productBrand;
    private String productStatus;
    private Long warrantyDuration;
    private SimpleProductInventory simpleProductInventory;
    private int productAverageRate;
    private int productCountReviews;

    @Data
    @Accessors(chain = true)
    public static class SimpleProductInventory {
        private Long productId;
        private Integer amount;
        private Integer available;
        private Integer sold;
    }
}
