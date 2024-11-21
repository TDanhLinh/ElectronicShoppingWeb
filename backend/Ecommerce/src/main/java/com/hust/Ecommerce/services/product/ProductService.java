package com.hust.Ecommerce.services.product;

import com.hust.Ecommerce.dtos.product.ProductRequest;
import com.hust.Ecommerce.dtos.product.ProductResponse;
import com.hust.Ecommerce.services.CrudService;

public interface ProductService extends CrudService<Long, ProductRequest, ProductResponse> {

}
