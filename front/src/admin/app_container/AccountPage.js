/*
Display the list of customers
*/
import DisplayTable from "../Table"
import {DataTableContext, ElementTableContext, LableTableContext} from "../TableContext";
import {useContext, useEffect} from "react";
import {request} from "../../api/axios";

const sampleLabel = ['STT', 'Họ và tên', 'Email', 'Số điện thoại', 'Vai trò', 'Thao tác'];
const sampleElement = ['id', 'name', 'email', 'phoneNumber', 'role'];

export default function AccountPage() {
    const {setLabel, setAction} = useContext(LableTableContext);
    const {setData, dataChange} = useContext(DataTableContext);
    const {setElement} = useContext(ElementTableContext);
    const buttonTitle = "Thêm người dùng";
    const header = "Quản lý người dùng";
    const functionName = "accounts";

    useEffect(() => {
        setLabel(sampleLabel);
        setElement(sampleElement);
        setAction("edit", "delete");
        request("GET", "/api/users").then((response) => {
            const accounts = response.data.payload.content.map((account) => {
                return {
                    ...account,
                    role: account.role.name
                }
            });

            setData(accounts.sort((a, b) => a.id - b.id));
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

