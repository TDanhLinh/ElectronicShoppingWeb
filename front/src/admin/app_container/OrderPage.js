/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {request} from "../../api/axios";

const sampleLabel = ['Mã đơn hàng', 'Tên khách hàng', 'Thời gian tạo', 'Phương thức thanh toán' ,'Trạng thái', 'Tổng tiền', 'Thao tác'];
const sampleElement = ['id', 'name', 'buyerName', 'created_at', 'payment_method_type', 'status', 'total_money'];

export default function OrderPage() {
    const {setLabel, setAction} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm người dùng";
    const header = "Quản lý đơn hàng";
    const functionName = "orders";

    useEffect(() => {
        setLabel(sampleLabel);
        setElement(sampleElement);
        setAction("view", "edit", "delete");
        request("GET", "/api/orders").then((response) => {
            setData(response.data.payload.content);
        }).catch(error => {
            console.log(error);
        })
    }, [dataChange, setData, setElement, setLabel]);

    return (
        <div>
            <DisplayTable header={header} buttonTitle={buttonTitle} functionName={functionName}/>
        </div>
    )
}