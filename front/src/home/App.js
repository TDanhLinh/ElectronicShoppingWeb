import { App_container } from "./app_container/App_container";
import { Header } from "./header/Header"
import { useEffect } from "react";
import { Footer } from "./footer/Footer";

export function App() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (!user || user.length === 0) window.location.href = '/login';
        }
    }, [])
    
    return (
        <div className="App">
            <Header />
            <App_container />
            <Footer />
        </div>
    );
}
