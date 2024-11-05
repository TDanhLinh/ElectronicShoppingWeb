package com.hust.Ecommerce.controllers.client;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.Ecommerce.constants.AppConstants;
import com.hust.Ecommerce.constants.FieldName;
import com.hust.Ecommerce.constants.ResourceName;
import com.hust.Ecommerce.dtos.ApiResponse;
import com.hust.Ecommerce.dtos.ListResponse;
import com.hust.Ecommerce.dtos.client.ClientProductResponse;
import com.hust.Ecommerce.dtos.inventory.InventoryRequest;
import com.hust.Ecommerce.dtos.inventory.InventoryResponse;
import com.hust.Ecommerce.entities.Product;
import com.hust.Ecommerce.exceptions.payload.ResourceNotFoundException;
import com.hust.Ecommerce.mappers.client.ClientProductMapper;
import com.hust.Ecommerce.mappers.inventory.InventoryMapper;
import com.hust.Ecommerce.repositories.inventory.InventoryRepository;
import com.hust.Ecommerce.repositories.product.ProductRepository;
import com.hust.Ecommerce.repositories.review.ReviewRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/client-api/products")
@RequiredArgsConstructor
public class ClientProductController {

        private final ProductRepository productRepository;
        private final InventoryRepository inventoryRepository;
        private final ClientProductMapper clientProductMapper;
        private final InventoryMapper inventoryMapper;
        private final ReviewRepository reviewRepository;

        // @GetMapping
        // public ResponseEntity<ListResponse<ClientProductResponse>> getAllProducts(
        // @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER)
        // int page,
        // @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE)
        // int size,
        // @RequestParam(name = "filter", required = false) String filter,
        // @RequestParam(name = "sort", required = false) String sort,
        // @RequestParam(name = "search", required = false) String search
        // ) {
        // // Phân trang
        // Pageable pageable = PageRequest.of(page - 1, size);

        // // Lấy danh sách sản phẩm theo điều kiện lọc và phân trang
        // Page<Product> products = productRepository.findByParams(filter, sort, search,
        // saleable, newable,
        // pageable);

        // // Lấy thông tin tồn kho của sản phẩm
        // List<Long> productIds = products.map(Product::getId).toList();
        // List<InventoryRequest> productInventories = projectionRepository
        // .findSimpleProductInventories(productIds);

        // List<ClientListedProductResponse> clientListedProductResponses = products
        // .map(product -> clientProductMapper.entityToListedResponse(product,
        // productInventories))
        // .toList();

        // return ResponseEntity.status(HttpStatus.OK)
        // .body(ListResponse.of(clientListedProductResponses, products));
        // }

        // @GetMapping("/{slug}")
        // public ResponseEntity<ApiResponse<?>> getProduct(@PathVariable String slug) {
        // Product product = productRepository.findBySlug(slug)
        // .orElseThrow(() -> new ResourceNotFoundException(ResourceName.PRODUCT,
        // FieldName.SLUG,
        // slug));

        // List<InventoryResponse> productInventories = inventoryMapper
        // .entityToResponse(inventoryRepository.findByProduct(product));

        // int averageRatingScore =
        // reviewRepository.findAverageRatingScoreByProductId(product.getId()).intValue();
        // int countReviews = reviewRepository.countByProductId(product.getId());

        // // Result
        // ClientProductResponse clientProductResponse = clientProductMapper
        // .entityToResponse(product, averageRatingScore,
        // countReviews);

        // return ResponseEntity.ok(ApiResponse.<ClientProductResponse>builder()
        // .success(true)
        // .payload(clientProductResponse)
        // .build());
        // }

}
