import { App_container } from "./app_container/App_container";
import { Header } from "./header/Header"
import { useEffect } from "react";

export function App() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (!user || user.length === 0) window.location.href = '/login';
        }
    })
    
    return (
        <div className="App">
            <Header />
            <App_container />
        </div>
    );
}
