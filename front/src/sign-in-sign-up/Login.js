import { useState } from 'react';
import Link from 'next/link';

export function Login() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const submit = (e) => {
        console.log(account);
        console.log(password);
        e.preventDefault();
        if (account !== "" && password !== "") {
            window.location.href = "/"
        }
        
    }

    return (
        <div className='login'>
            <h1 className='describe'>ĐĂNG NHẬP VÀO WEB BÁN HÀNG</h1>
            <div className='login-form'>
                <h2>ĐĂNG NHẬP</h2>
                <form onSubmit={submit}>
                    <input
                        type="text"
                        className="input-box"
                        id="account"
                        value={account}
                        placeholder='Account'
                        onChange={(e) => setAccount(e.target.value)}
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
                    <div className="options">
                        <label>
                            <input 
                                type="checkbox" 
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            Remember me
                        </label>
                        <Link href="/" className='forgot-password'>Forgot password?</Link>
                    </div>
                    <input
                        type="submit"
                        className="login-btn"
                        value="Login"
                    />
                    <div className='register'>
                        <p>To Register New Account →</p>
                        <button
                            type="submit"
                            className='register-btn'
                            onClick={()=>{window.location.href="/"}}
                        >
                            Click Here
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}