/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {listAllAPI} from "../api/axios";

const sampleLabel = ['STT', 'Tên sản phẩm', 'Số lượng', 'Giá', 'Tình trạng', 'Model', 'Lần cập nhập cuối', 'Thao tác'];
const sampleElement = ['id', 'name', 'unit', 'price', 'status', 'model', 'updated_at'];

export default function ListEquipments() {
    const {setLabel} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm sản phẩm";
    const header = "Quản lý sản phẩm";
    const functionName = "manageProduct";

    useEffect(() => {
        setLabel(sampleLabel);
        setElement(sampleElement);
        listAllAPI(functionName).then((response) => {
            setData(response.data);
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