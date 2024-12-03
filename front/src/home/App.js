import { App_container } from "./app_container/App_container";
import { Header } from "../header/Header"
import { useEffect } from "react";
import { Footer } from "../footer/Footer";
import { useState } from "react";

export function App() {

    const [searchText, setSearchText] = useState(''); // dùng để lọc sản phẩm theo tìm kiếm của người dùng
    
    return (
        <div className="App">
            <Header
                setSearchText = {setSearchText}
            />
            <App_container
                searchText = {searchText}
                setSearchText = {setSearchText}
            />
            <Footer />
        </div>
    );
}
