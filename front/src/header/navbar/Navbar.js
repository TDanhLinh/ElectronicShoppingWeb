import { Notify } from "./Notify";
import { User } from "./User";
import Link from "next/link";

export function Navbar() {
    return (
        <nav className="header__navbar">
            <ul className="header__navbar-list">
                <li className="header__navbar-item header__navbar-item--seperate header__navbar-item--download">
                    Sản phẩm bán hàng điện tử của nhóm 30
                </li>
                <li className="header__navbar-item">    
                    <span className="header__navbar-title--noPointer">Kết nối</span>
                    <Link href="https://www.facebook.com" className="header__navbar-icon-link">
                        <i className="header_navbar-icon fab fa-facebook"></i>
                    </Link>
                    <Link href="https://www.instagram.com" className="header__navbar-icon-link">
                        <i className="header_navbar-icon fab fa-instagram"></i>
                    </Link>
                </li>
            </ul>
            <ul className="header__navbar-list">
                <Notify />
                <li className="header__navbar-item">
                    <i className="header_navbar-icon far fa-question-circle"></i>
                    <Link href="/under-dev" className="header__navbar-item-link">Trợ giúp</Link>
                </li>
                <User />
            </ul>
        </nav>
    )
}