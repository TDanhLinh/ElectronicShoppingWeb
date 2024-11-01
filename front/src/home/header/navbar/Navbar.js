import { Notify } from "./Notify";
import { User } from "./User";
import Link from "next/link";

export function Navbar() {
    return (
        <nav className="header__navbar">
            <ul className="header__navbar-list">
                <li className="header__navbar-item header__navbar-item--seperate header__navbar-item--download">
                    Vào cửa hàng trên ứng dụng Nhóm 30-Shop
                    
                    <div className="header__qr">
                        <img src="./assets/img/QR_code.png" alt="QR Code" className="header__qr-img"/>
                        <div className="header__download">
                            <Link href="https://www.googleplay.com" className="header__download-app">
                                <img src="./assets/img/GooglePlay.png" alt="Google Play" className="header__download-img"/>
                            </Link>
                            <Link href="https://www.apple.com/app-store/" className="header__download-app">
                                <img src="./assets/img/Appstore.png" alt="Appstore" className="header__download-img"/>
                            </Link>
                        </div>
                    </div>
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
                    <Link href="" className="header__navbar-item-link">Trợ giúp</Link>
                </li>
                <User />
            </ul>
        </nav>
    )
}