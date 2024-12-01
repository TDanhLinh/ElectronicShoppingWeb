import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Login() {
    const router = useRouter();

    // nếu đã đăng nhập rồi, chuyển sang trang chủ
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user && user.length > 0) router.push('/');
    }, [])
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        if (success) return;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            // kiểm tra email có đúng định dạng hay không
            setError(true);
            setErrorMsg('Tài khoản không hợp lệ');
            return;
        }

        if (password === '') {
            setError(true);
            setErrorMsg('Mật khẩu không được để trống');
            return;
        }

        var accounts = localStorage.getItem("accounts");

        if (accounts) {
            accounts = JSON.parse(accounts);
            const account = accounts.find((item) => (item.email === email));
            if (account && account.password === password) {
                setSuccess(true);
                setError(false);
                router.push("/");
                localStorage.setItem("user", email);
            }
            else {
                setError(true);
                setErrorMsg("Tài khoản hoặc mật khẩu không đúng")
            }
        }
        else {
            setError(true);
            setErrorMsg("Tài khoản hoặc mật khẩu không đúng")
        }
    }

    return (
        <div className='login-container'>
            <h1 className='login-header'>ĐĂNG NHẬP VÀO WEB BÁN HÀNG</h1>
            <div className='login-form'>
                <h2 className='form-title'>ĐĂNG NHẬP</h2>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        className="input-field"
                        id="email-input"
                        value={email}
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="input-field"
                        id="password-input"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {
                        error && 
                        <div className='error-message'>
                            {errorMsg}
                        </div>
                    }
                    <div className="options-container">
                        <label htmlFor="remember-me">
                            <input 
                                type="checkbox" 
                                id="remember-me" 
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            Remember me
                        </label>
                        <Link href="/forgot-password" className='forgot-password-link'>Forgot password?</Link>
                    </div>
                    <input
                        type="submit"
                        className="submit-btn"
                        value="Login"
                    />
                    <div className='register-link-container'>
                        <p>To Register New Account →</p>
                        <Link href='/register'>
                            <button
                                type="button"
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

