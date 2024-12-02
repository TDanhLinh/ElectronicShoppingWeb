import { useState, useEffect } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';

export function User() {
    const router = useRouter();
    
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // lấy ra thông tin người dùng từ database, hiện tại chưa có axios
    useEffect(() => {
        const account = localStorage.getItem('user');
        if (account !== '') {
            setUser(JSON.parse(localStorage.getItem(account)));
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, [])

    return (
        <li className="header__navbar-item header__navbar-user">
            {   
                isLoggedIn &&
                <img src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg" alt="" className="header__navbar-user-img"/>
            }
            {
                isLoggedIn &&
                <span className="header__navbar-user-name">{user.nickname || user.name}</span>
            }
            {
                isLoggedIn &&
                <ul className="header__navbar-user-menu">
                    <li className="header__navbar-user-item">
                        <Link href="/my-account" >Tài khoản của tôi</Link>
                    </li>
                    <li className="header__navbar-user-item">
                        <Link href="/payment">Đơn hàng của tôi</Link>
                    </li>
                    <li className="header__navbar-user-item header__navbar-user-item--separate">
                        <Link 
                            href="/login"
                            onClick={() => {
                                localStorage.setItem('user', '');
                            }}
                        >
                            Đăng xuất
                        </Link>
                    </li>
                </ul>
            }
            {   
                !isLoggedIn &&
                <img src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg" alt="" className="header__navbar-user-img"/>
            }
            {
                !isLoggedIn &&
                <span 
                    className="header__navbar-user-name"
                    onClick={() => {
                        router.push('/login');
                    }}
                >
                    Đăng nhập
                </span>
            }
        </li>
    )
}