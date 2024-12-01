import { useState, useEffect } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';

export function User() {
    const router = useRouter();
    
    const [user, setUser] = useState({});

    // lấy ra thông tin người dùng từ database, hiện tại chưa có axios
    useEffect(() => {
        const account = localStorage.getItem('user');
        setUser(JSON.parse(localStorage.getItem(account)));
    }, [])

    return (
        <li className="header__navbar-item header__navbar-user">
            <img src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg" alt="" className="header__navbar-user-img"/>
            <span className="header__navbar-user-name">{user.name}</span>

            <ul className="header__navbar-user-menu">
                <li className="header__navbar-user-item">
                    <Link href="/my-account" >Tài khoản của tôi</Link>
                </li>
                <li className="header__navbar-user-item">
                    <Link href="/payment">Đơn hàng của tôi</Link>
                </li>
                <li className="header__navbar-user-item header__navbar-user-item--separate">
                    <Link 
                        href=""
                        onClick={() => {
                            localStorage.setItem('user', '');
                            router.push('/login')
                        }}
                    >
                        Đăng xuất
                    </Link>
                </li>
            </ul>
        </li>
    )
}