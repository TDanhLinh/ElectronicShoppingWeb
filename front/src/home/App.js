import {App_container} from "./app_container/App_container";
import {Header} from "../header/Header"
import {useEffect, useState} from "react";
import {Footer} from "../footer/Footer";
import {request} from "../api/axios";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";

export function App() {
    const [searchText, setSearchText] = useState(''); // dùng để lọc sản phẩm theo tìm kiếm của người dùng
    const router = useRouter();
    const [cookies] = useCookies(["authToken"]);

    useEffect(() => {
        const token = cookies.authToken;
        if (token && token !== "undefined") {
            request("GET", "api/auth/info").then((res) => {
                if (res.data.payload.role !== "USER") {
                    router.push('/seller');
                }
            })
        }
    }, []);

    return (<div className="App">
        <Header
            setSearchText={setSearchText}/>
        <App_container searchText={searchText}
                       setSearchText={setSearchText}/>
        <Footer/>
    </div>);
}
