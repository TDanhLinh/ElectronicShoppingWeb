import {App_container} from "./app_container/App_container";
import {Header} from "../header/Header"
import {useEffect, useState} from "react";
import {Footer} from "../footer/Footer";
import {DataTableContext, ElementTableContext, LableTableContext} from "../admin/TableContext";

export function App() {
    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);
    const [element, setElement] = useState([]);
    const [user, setUser] = useState([]);

    const [searchText, setSearchText] = useState(''); // dùng để lọc sản phẩm theo tìm kiếm của người dùng

    return (<div className="App">
            <DataTableContext.Provider value={{data, setData}}>
                <LableTableContext.Provider value={{label, setLabel}}>
                    <ElementTableContext.Provider value={{element, setElement}}>
                        <Header
                            setSearchText={setSearchText}

                        /><App_container searchText={searchText}
                                         setSearchText={setSearchText}/>
                        <Footer/>
                    </ElementTableContext.Provider>
                </LableTableContext.Provider>
            </DataTableContext.Provider>
    </div>);
}
