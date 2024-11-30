import { Cart } from "./Cart";
import { Search_input } from "./Search_input";
import Link from 'next/link';

export function Search({setSearchText}) {
    return (
        <div className="header-with-search">
            <div className="header__logo">
                <Link href="/" className="header__logo-link">
                    <img src="/assets/img/logo.png" className="header__logo-img"/>
                </Link>
            </div>
            <Search_input
                setSearchText = {setSearchText}
            />
            <Cart />
        </div> 
    )
}