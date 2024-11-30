import { Header } from "../header/Header"
import { App_container } from "./app_container/App_container";
import { useState, useEffect } from "react";
import { Footer } from "../footer/Footer";
import { useRouter } from 'next/router';

export function ProductID({id}) {
    const router = useRouter();

    // nếu chưa đăng nhập, chuyển sang trang đăng nhập
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user || user.length === 0) router.push('/login');
    }, [])
    
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