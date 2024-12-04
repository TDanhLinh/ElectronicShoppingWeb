/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {request} from "../../api/axios";

const sampleLabel = ['Mã đơn hàng', 'Tên khách hàng', 'Thời gian tạo', 'Phương thức thanh toán', 'Trạng thái', 'Tổng tiền (đ)', 'Thao tác'];
const sampleElement = ['code', 'toName', 'createdAt', 'paymentMethodType', 'status', 'totalPay'];

export default function OrderPage(props) {
    const {setLabel, setAction} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm người dùng";
    const header = "Quản lý đơn hàng";
    const functionName = "orders";

    const statusMap = {
        1: "Chờ thanh toán",
        2: "Đã thanh toán",
        3: "Đang vận chuyển",
        4: "Đã giao hàng",
        5: "Đã hủy",
        6: "Hoàn tất"
    };

    useEffect(() => {
        // Set labels, elements, and actions
        setLabel(sampleLabel);
        setElement(sampleElement);
        setAction(["view", "edit", "delete"]);

        // Fetch order data
        request("GET", "/api/orders")
            .then((response) => {
                const updatedData = response.data.payload.content.map(order => ({
                    ...order,
                    status: statusMap[order.status] || "Unknown status",
                }));
                setData(updatedData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dataChange]);

    return (
        <div>
            <DisplayTable header={header} buttonTitle={buttonTitle} functionName={functionName}/>
        </div>
    )
}