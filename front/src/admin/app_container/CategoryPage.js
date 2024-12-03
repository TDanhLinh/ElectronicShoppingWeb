/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {request} from "../../api/axios";

const sampleLabel = ['STT', 'Loại sản phẩm', 'Mô tả', 'Thời điểm tạo', 'Thao tác'];
const sampleElement = ['id', 'name', 'description', 'created_at'];

export default function CategoryPage(props) {
    const {setLabel, setAction} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm phân loại sản phẩm";
    const header = "Phân loại loại sản phẩm";
    const functionName = "categories";

    useEffect(() => {
        setLabel(sampleLabel);
        setElement(sampleElement);
        setAction(["add", "edit", "delete"]);

        request("GET", "/api/categories").then((response) => {
            setData(response.data.payload.content.sort((a, b) => a.id - b.id));
        }).catch(error => {
            console.log(error);
        })
    }, [dataChange]);

    return (
        <div>
            <DisplayTable header={header} buttonTitle={buttonTitle} functionName={functionName}/>
        </div>
    )
}