import { User } from "./User";
import Link from "next/link";
import { useRouter } from 'next/router';

export function Navbar() {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/under-dev');
    }
    
    return (
        <nav className="header__navbar">
            <ul className="header__navbar-list">
                <li className="header__navbar-item header__navbar-item--seperate header__navbar-item--download">
                    Nhóm 30 - Web bán đồ điện tử
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
                <li className="header__navbar-item header__navbar-item--notify">
                    <i className="header_navbar-icon far fa-bell"></i>
                    <div onClick={handleClick} className="header__navbar-item-link">Thông báo</div>
                </li>
                <li className="header__navbar-item">
                    <i className="header_navbar-icon far fa-question-circle"></i>
                    <div onClick={handleClick} className="header__navbar-item-link">Trợ giúp</div>
                </li>
                <User />
            </ul>
        </nav>
    )
}