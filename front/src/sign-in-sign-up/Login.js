import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Login() {
    // Nếu đã đăng nhập, chuyển trang chính
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user'); // user là email người dùng
            if (user && user.length > 0) window.location.href = '/';
        }
    }, [])
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [fail, setFail] = useState(false); // kiểm tra đăng nhập có thành không không

    const submit = (e) => {
        e.preventDefault();

        // kiểm tra xem thông tin đăng nhập có đúng không
        // khi ghép nối, thay localStorage bằng axios
        var accounts = localStorage.getItem("accounts");

        if (accounts) {
            accounts = JSON.parse(accounts);
            const account = accounts.find((item) => (item.email === email));
            if (account && account.password === password) {
                window.location.href = "/";
                localStorage.setItem("user", email);
            }
            else setFail(true);
        }
        else {
            setFail(true);
        }
    }

    return (
        <div className='container'>
            <h1 className='describe'>ĐĂNG NHẬP VÀO WEB BÁN HÀNG</h1>
            <div className='form'>
                <h2>ĐĂNG NHẬP</h2>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        className="input-box"
                        id="email"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="input-box"
                        id="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {fail && (<div className='message'>Tài khoản hoặc mật khẩu không đúng</div>)}
                    <div className="options">
                        <label>
                            <input 
                                type="checkbox" 
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            Remember me
                        </label>
                        <Link href="/forgot-password" className='forgot-password'>Forgot password?</Link>
                    </div>
                    <input
                        type="submit"
                        className="btn"
                        value="Login"
                    />
                    <div className='register'>
                        <p>To Register New Account →</p>
                        <Link href='/register'>
                            <button
                                type="submit"
                                className='register-btn'
                            >
                                Click Here
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}