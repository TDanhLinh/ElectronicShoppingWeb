import { Navbar } from "./navbar/Navbar";
import { Search } from "./search/Search";

export function Header({setSearchText, cart, setCart}) {
    return (
        <header className="header">
            <div className="grid wide">
                <Navbar />
                <Search
                    setSearchText = {setSearchText}
                    cart = {cart}
                    setCart = {setCart}
                />
            </div>
        </header>
    )
}