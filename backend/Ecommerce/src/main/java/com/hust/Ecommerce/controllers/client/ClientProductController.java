package com.hust.Ecommerce.controllers.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.Ecommerce.constants.AppConstants;
import com.hust.Ecommerce.dtos.ListResponse;
import com.hust.Ecommerce.dtos.client.ClientProductResponse;
import com.hust.Ecommerce.dtos.review.ReviewResponse.ProductResponse;
import com.hust.Ecommerce.mappers.client.ClientProductMapper;
import com.hust.Ecommerce.repositories.product.ProductRepository;
import com.hust.Ecommerce.repositories.review.ReviewRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/client-api/products")
@RequiredArgsConstructor
public class ClientProductController {

        private final ProductRepository productRepository;

        private final ClientProductMapper clientProductMapper;
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
        // public ResponseEntity<ClientProductResponse> getProduct(@PathVariable String
        // slug) {
        // Product product = productRepository.findBySlug(slug)
        // .orElseThrow(() -> new ResourceNotFoundException(ResourceName.PRODUCT,
        // FieldName.SLUG,
        // slug));

        // List<InventoryRequest> productInventories = projectionRepository
        // .findSimpleProductInventories(List.of(product.getId()));

        // int averageRatingScore =
        // reviewRepository.findAverageRatingScoreByProductId(product.getId());
        // int countReviews = reviewRepository.countByProductId(product.getId());

        // // Related Products
        // Page<Product> relatedProducts = productRepository.findByParams(
        // String.format("category.id==%s;id!=%s",
        // Optional.ofNullable(product.getCategory())
        // .map(BaseEntity::getId)
        // .map(Object::toString)
        // .orElse("0"),
        // product.getId()),
        // "random",
        // null,
        // false,
        // false,
        // PageRequest.of(0, 4));

        // List<Long> relatedProductIds = relatedProducts.map(Product::getId).toList();
        // List<InventoryRequest> relatedProductInventories = projectionRepository
        // .findSimpleProductInventories(relatedProductIds);

        // List<ClientListedProductResponse> relatedProductResponses = relatedProducts
        // .map(p -> clientProductMapper.entityToListedResponse(p,
        // relatedProductInventories))
        // .toList();

        // // Result
        // ClientProductResponse clientProductResponse = clientProductMapper
        // .entityToResponse(product, productInventories, averageRatingScore,
        // countReviews,
        // relatedProductResponses);

        // return ResponseEntity.status(HttpStatus.OK).body(clientProductResponse);
        // }

}
