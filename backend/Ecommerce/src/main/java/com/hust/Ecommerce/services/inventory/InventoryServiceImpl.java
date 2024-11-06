package com.hust.Ecommerce.services.inventory;

import java.util.List;

import com.hust.Ecommerce.constants.FieldName;
import com.hust.Ecommerce.constants.ResourceName;
import com.hust.Ecommerce.constants.SearchFields;
import com.hust.Ecommerce.dtos.ListResponse;
import com.hust.Ecommerce.dtos.inventory.InventoryRequest;
import com.hust.Ecommerce.dtos.inventory.InventoryResponse;
import com.hust.Ecommerce.entities.Inventory;
import com.hust.Ecommerce.exceptions.payload.ResourceNotFoundException;
import com.hust.Ecommerce.mappers.inventory.InventoryMapper;
import com.hust.Ecommerce.repositories.inventory.InventoryRepository;

public class InventoryServiceImpl implements IInventoryService {

    private InventoryRepository inventoryRepository;

    private InventoryMapper inventoryMapper;

    @Override
    public ListResponse<InventoryResponse> findAll(int page, int size, String sort, String filter, String search,
            boolean all) {
        return defaultFindAll(page, size, sort, filter, search, all, SearchFields.INVENTORY, inventoryRepository,
                inventoryMapper);
    }

    @Override
    public InventoryResponse findById(Long id) {
        return defaultFindById(id, inventoryRepository, inventoryMapper, ResourceName.INVENTORY);
    }

    @Override
    public InventoryResponse save(InventoryRequest request) {
        return defaultSave(request, inventoryRepository, inventoryMapper);
    }

    @Override
    public InventoryResponse save(Long id, InventoryRequest request) {
        Inventory inventory = inventoryRepository.findById(id)
                .map(existingEntity -> inventoryMapper.partialUpdate(existingEntity, request))
                .map(inventoryRepository::save)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.INVENTORY, FieldName.ID, id));

        return inventoryMapper.entityToResponse(inventory);
    }

    @Override
    public void delete(Long id) {
        inventoryRepository.deleteById(id);
    }

    @Override
    public void delete(List<Long> ids) {
        inventoryRepository.deleteAllById(ids);
    }

}
