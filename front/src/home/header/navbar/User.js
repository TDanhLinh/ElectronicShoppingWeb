import { useState, useEffect } from "react"
import Link from 'next/link';

export function User() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const account = localStorage.getItem('user');
        setUser(JSON.parse(localStorage.getItem(account)));
    }, [])

    return (
        <li className="header__navbar-item header__navbar-user">
            <img src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg" alt="" className="header__navbar-user-img"/>
            <span className="header__navbar-user-name">{user.firstname + ' ' + user.lastname}</span>

            <ul className="header__navbar-user-menu">
                <li className="header__navbar-user-item">
                    <Link href="" >Tài khoản của tôi</Link>
                </li>
                <li className="header__navbar-user-item">
                    <Link href="/payment">Đơn mua</Link>
                </li>
                <li className="header__navbar-user-item header__navbar-user-item--separate">
                    <Link 
                        href=""
                        onClick={() => {
                            localStorage.setItem('user', '');
                            window.location.href = '/login';
                        }}
                    >
                        Đăng xuất
                    </Link>
                </li>
            </ul>
        </li>
    )
}