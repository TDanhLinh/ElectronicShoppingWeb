import { App_container } from "./app_container/App_container";
import { Header } from "../header/Header"
import { useEffect } from "react";
import { Footer } from "../footer/Footer";
import { useState } from "react";

export function App() {
    const [searchText, setSearchText] = useState('');
    const [cart, setCart] = useState([])

    // nếu chưa đăng nhập, chuyển sang trang đăng nhập
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (!user || user.length === 0) window.location.href = '/login';
        }
    }, [])
    
    return (
        <div className="App">
            <Header
                setSearchText = {setSearchText}
                cart = {cart}
                setCart = {setCart}
            />
            <App_container
                searchText = {searchText}
                setSearchText = {setSearchText}
            />
            <Footer />
        </div>
    );
}
