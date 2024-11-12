// package com.hust.Ecommerce.mappers.inventory;

// import org.mapstruct.Mapper;
// import org.mapstruct.Mapping;
// import org.mapstruct.ReportingPolicy;

// import com.hust.Ecommerce.dtos.inventory.InventoryRequest;
// import com.hust.Ecommerce.dtos.inventory.InventoryResponse;
// import com.hust.Ecommerce.entities.inventory.Count;
// import com.hust.Ecommerce.mappers.GenericMapper;
// import com.hust.Ecommerce.util.MapperUtils;

// @Mapper(componentModel = "spring", unmappedTargetPolicy =
// ReportingPolicy.IGNORE, uses = MapperUtils.class)
// public interface InventoryMapper extends GenericMapper<Count,
// InventoryRequest, InventoryResponse> {

// @Override
// @Mapping(source = "productId", target = "product")
// Count requestToEntity(InventoryRequest request);

// }
