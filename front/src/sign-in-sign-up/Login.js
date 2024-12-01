import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Login() {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user && user.length > 0) router.push('/');
    }, [])
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [fail, setFail] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        var accounts = localStorage.getItem("accounts");

        if (accounts) {
            accounts = JSON.parse(accounts);
            const account = accounts.find((item) => (item.email === email));
            if (account && account.password === password) {
                router.push("/");
                localStorage.setItem("user", email);
            }
            else setFail(true);
        }
        else {
            setFail(true);
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
                    {fail && (<div className='error-message'>Tài khoản hoặc mật khẩu không đúng</div>)}
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

