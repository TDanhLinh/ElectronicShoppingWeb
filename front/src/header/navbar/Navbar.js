import { Notify } from "./Notify";
import { User } from "./User";

export function Navbar() {
    return (
        <nav className="header__navbar hide-on-mobile-tablet">
            <ul className="header__navbar-list">
                <li className="header__navbar-item header__navbar-item--seperate header__navbar-item--download">
                    Vào cửa hàng trên ứng dụng F8-Shop
                    
                    <div className="header__qr">
                        <img src="./assets/img/QR_code.png" alt="QR Code" className="header__qr-img"/>
                        <div className="header__download">
                            <a href="https://www.googleplay.com" className="header__download-app">
                                <img src="./assets/img/GooglePlay.png" alt="Google Play" className="header__download-img"/>
                            </a>
                            <a href="https://www.apple.com/app-store/" className="header__download-app">
                                <img src="./assets/img/Appstore.png" alt="Appstore" className="header__download-img"/>
                            </a>
                        </div>
                    </div>
                </li>
                <li className="header__navbar-item">    
                    <span className="header__navbar-title--noPointer">Kết nối</span>
                    <a href="https://www.facebook.com" className="header__navbar-icon-link">
                        <i className="header_navbar-icon fab fa-facebook"></i>
                    </a>
                    <a href="https://www.instagram.com" className="header__navbar-icon-link">
                        <i className="header_navbar-icon fab fa-instagram"></i>
                    </a>
                </li>
            </ul>
            <ul className="header__navbar-list">
                <li className="header__navbar-item header__navbar-item--notify">
                    <i className="header_navbar-icon far fa-bell"></i>
                    <a href="" className="header__navbar-item-link">Thông báo</a>
                    <Notify />
                </li>
                <li className="header__navbar-item">
                    <i className="header_navbar-icon far fa-question-circle"></i>
                    <a href="" className="header__navbar-item-link">Trợ giúp</a>
                </li>
                <User />
            </ul>
        </nav>
    )
}