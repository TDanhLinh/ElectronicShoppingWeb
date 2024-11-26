package com.hust.Ecommerce.controllers.client;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.hust.Ecommerce.constants.FieldName;
import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.constants.ResourceName;
import com.hust.Ecommerce.dtos.ApiResponse;
import com.hust.Ecommerce.dtos.client.cart.ClientCartRequest;
import com.hust.Ecommerce.dtos.client.cart.ClientCartResponse;
import com.hust.Ecommerce.dtos.client.cart.ClientCartVariantKeyRequest;
import com.hust.Ecommerce.entities.authentication.User;
import com.hust.Ecommerce.entities.cart.Cart;
import com.hust.Ecommerce.entities.cart.CartVariantKey;
import com.hust.Ecommerce.exceptions.payload.ResourceNotFoundException;
import com.hust.Ecommerce.mappers.client.ClientCartMapper;
import com.hust.Ecommerce.repositories.cart.CartRepository;
import com.hust.Ecommerce.repositories.cart.CartVariantRepository;
import com.hust.Ecommerce.services.authentication.IAuthenticationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/client-api/carts")
@AllArgsConstructor
public class ClientCartController {

    private CartRepository cartRepository;
    private CartVariantRepository cartVariantRepository;
    private ClientCartMapper clientCartMapper;
    private IAuthenticationService authenticationService;

    // lay cac cartVariant hien tai cua user ma co status = 1
    @GetMapping
    public ResponseEntity<ApiResponse<?>> getCart() {
        Optional<User> user = authenticationService.getUserWithAuthorities();
        if (user.isEmpty())
            throw new ResourceNotFoundException(MessageKeys.ACCOUNT_NOT_LOGIN);

        ObjectMapper mapper = new ObjectMapper();

        ObjectNode response = cartRepository.findByUser(user.get())
                .map(clientCartMapper::entityToResponse)
                .map(clientCartResponse -> mapper.convertValue(clientCartResponse, ObjectNode.class))
                .orElse(mapper.createObjectNode());

        return ResponseEntity.ok(ApiResponse.<ObjectNode>builder().success(true).payload(response).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> saveCart(@RequestBody ClientCartRequest request) {
        final Cart cartBeforeSave;

        // TODO: Đôi khi cartId null nhưng thực tế user vẫn đang có cart trong DB
        if (request.getCartId() == null) {
            cartBeforeSave = clientCartMapper.requestToEntity(request);
        } else {
            cartBeforeSave = cartRepository.findById(request.getCartId())
                    .map(existingEntity -> clientCartMapper.partialUpdate(existingEntity,
                            request))
                    .orElseThrow(() -> new ResourceNotFoundException(ResourceName.CART,
                            FieldName.ID, request.getCartId()));
        }

        // // Validate Variant Inventory
        // for (CartVariant cartVariant : cartBeforeSave.getCartVariants()) {
        // int inventory = InventoryUtils
        // .calculateInventoryIndices(
        // docketVariantRepository.findByVariantId(cartVariant.getCartVariantKey().getVariantId()))
        // .get("canBeSold");
        // if (cartVariant.getQuantity() > inventory) {
        // throw new RuntimeException("Variant quantity cannot greater than variant
        // inventory");
        // }
        // }

        Cart cart = cartRepository.save(cartBeforeSave);
        ClientCartResponse clientCartResponse = clientCartMapper.entityToResponse(cart);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.<ClientCartResponse>builder().success(true).payload(clientCartResponse).build());
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<?>> deleteCartItems(@RequestBody List<ClientCartVariantKeyRequest> idRequests) {
        List<CartVariantKey> ids = idRequests.stream()
                .map(idRequest -> new CartVariantKey(idRequest.getCartId(), idRequest.getVariantId()))
                .collect(Collectors.toList());
        cartVariantRepository.deleteAllById(ids);
        return ResponseEntity.ok(ApiResponse.builder().success(true).build());
    }
}
