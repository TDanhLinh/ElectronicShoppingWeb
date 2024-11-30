import {App_container} from "./app_container/App_container";
import {Header} from "../header/Header"
import {useEffect, useState} from "react";
import {Footer} from "../footer/Footer";
import {DataTableContext, ElementTableContext, LableTableContext} from "../admin/TableContext";
import { useRouter } from 'next/router';

export function App() {
    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);
    const [element, setElement] = useState([]);
    const [user, setUser] = useState([]);

    const router = useRouter();

    // nếu chưa đăng nhập, chuyển sang trang đăng nhập
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user || user.length === 0) router.push('/login');
    }, [])
const [searchText, setSearchText] = useState(''); // dùng để lọc sản phẩm theo tìm kiếm của người dùng
    return (<div className="App">
            <DataTableContext value={{data, setData}}>
                <LableTableContext value={{label, setLabel}}>
                    <ElementTableContext value={{element, setElement}}>
                        <Header
                            setSearchText={setSearchText}

                        /><App_container searchText={searchText}
                                         setSearchText={setSearchText}/>
                        <Footer/>
                    </ElementTableContext>
                </LableTableContext>
            </DataTableContext>
        </div>);
}
