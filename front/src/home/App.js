import { App_container } from "./app_container/App_container";
import { Header } from "../header/Header"
import { useEffect } from "react";
import { Footer } from "../footer/Footer";
import { useState } from "react";
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

    const [searchText, setSearchText] = useState('');
    const [cart, setCart] = useState([])

    // nếu chưa đăng nhập, chuyển sang trang đăng nhập
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = cookies().getItem('user');
            if (!user || user.length === 0) window.location.href = '/login';
        }
    }, [])

    return (
        <div className="App">
            <DataTableContext value={{data, setData}}>
                <LableTableContext value={{label, setLabel}}>
                    <ElementTableContext value={{element, setElement}}>
                        <Header
                        setSearchText = {setSearchText}
                cart = {cart}
                setCart = {setCart}
            /><App_containersearchText = {searchText}
                setSearchText = {setSearchText}/>
                        <Footer/>
                    </ElementTableContext>
                </LableTableContext>
            </DataTableContext>
        </div>
    );
}
