import {Header} from "../header/Header"
import {App_container} from "./app_container/App_container";
import {useEffect, useState} from "react";
import {Footer} from "../footer/Footer";
import {useRouter} from 'next/router';
import {DataTableContext, ElementTableContext, LableTableContext} from "./TableContext";

export function Seller() {
    const router = useRouter();
    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);
    const [element, setElement] = useState([]);
    const [viewAction, setViewAction] = useState(true);

    // nếu chưa đăng nhập, chuyển sang trang đăng nhập
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user || user.length === 0) router.push('/login');
    }, [])

    const [searchText, setSearchText] = useState('');

    return (
        <div className="App">
            <DataTableContext.Provider value={{data, setData}}>
                <LableTableContext.Provider value={{label, setLabel, action, setAction}}>
                    <ElementTableContext.Provider value={{element, setElement}}>
                        <Header
                            setSearchText={setSearchText}
                        />
                        <App_container/>
                        <Footer/>
                    </ElementTableContext.Provider>
                </LableTableContext.Provider>
            </DataTableContext.Provider>
        </div>
    );
}
