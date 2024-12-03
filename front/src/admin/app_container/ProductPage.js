/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {request} from "../../api/axios";

const sampleLabel = ['STT', 'Tên sản phẩm', 'Số lượng trong kho', 'Số lượng đã bán', 'Giá', 'Tình trạng', 'Lần cập nhập cuối', 'Thao tác'];
const sampleElement = ['id', 'name', 'totalAvailable', 'totalSold', 'price', 'status', 'updated_at'];

export default function ProductPage() {
    const {setLabel, setAction} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm sản phẩm";
    const header = "Quản lý sản phẩm";
    const functionName = "products";

    useEffect(() => {
        setLabel(sampleLabel);
        setElement(sampleElement);
        setAction(["add", "view", "edit", "delete"]);
        Promise.all([
            request("GET", "/api/products"),
            request("GET", "/api/inventories")
        ])
            .then(([productsResponse, inventoriesResponse]) => {
                const rawProducts = productsResponse.data.payload.content;
                const inventories = inventoriesResponse.data.payload.content;

                const inventoryMap = inventories.reduce((map, inventoryItem) => {
                    map[inventoryItem.variant.id] = inventoryItem;
                    return map;
                }, {});

                const products = rawProducts.map((product) => {
                    // Get the min and max cost of the variants
                    const costs = product.variants.map((variant) => variant.cost);
                    const minCost = Math.min(...costs);
                    const maxCost = Math.max(...costs);

                    // Get the total available and sold
                    const totalAvailable = product.variants.reduce((sum, variant) => {
                        const inventoryItem = inventoryMap[variant.id];
                        return inventoryItem ? sum + inventoryItem.available : sum;
                    }, 0);

                    const totalSold = product.variants.reduce((sum, variant) => {
                        const inventoryItem = inventoryMap[variant.id];
                        return inventoryItem ? sum + inventoryItem.sold : sum;
                    }, 0);

                    // Return the updated product object with total available/sold, price range, and status
                    return {
                        ...product,
                        totalAvailable,
                        totalSold,
                        price: minCost === maxCost ? `${minCost} đ` : `${minCost} đ - ${maxCost} đ`, // Price range or single price
                        status: product.status === 1 ? "Đang bán" : "Ngừng bán", // Status translation
                        variants: product.variants.map((variant) => {
                            const inventoryItem = inventoryMap[variant.id];
                            return inventoryItem
                                ? {
                                    ...variant,
                                    available: inventoryItem.available,
                                    sold: inventoryItem.sold,
                                }
                                : variant;
                        }),
                    };
                }).sort((a, b) => a.id - b.id);

                setData(products);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [dataChange, setData, setElement, setLabel]);

    return (
        <div>
            <DisplayTable header={header} buttonTitle={buttonTitle} functionName={functionName}/>
        </div>
    )
}