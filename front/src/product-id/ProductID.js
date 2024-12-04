import { Header } from "../header/Header"
import { App_container } from "./app_container/App_container";
import { useState, useEffect } from "react";
import { Footer } from "../footer/Footer";

export function ProductID({id}) {
    
    const [searchText, setSearchText] = useState('');
    
    return (
        <div className="App">
            <Header
                setSearchText = {setSearchText}
            />
            <App_container 
                id={id}
            />
            <Footer />
        </div>
    );
}