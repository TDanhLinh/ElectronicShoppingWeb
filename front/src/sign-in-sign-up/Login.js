import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {request} from "../api/axios";
import {useCookies} from "react-cookie";

export function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(["authToken"]);

    // If the user is already logged in, redirect to the home page
    useEffect(() => {
        const token = cookies.authToken;
        if (token && token !== "undefined") router.push('/');
    }, []);

    const submit = async (e) => {
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
        setLoading(true);

        // Send login request to BE
        request("POST", "/api/auth/login", {email, password})
            .then((response) => {
                console.log(response.data);
                setLoading(false);
                if (response.status === 200) {
                    router.push("/");
                    setCookie("authToken", response.data.payload.token, {path: "/", maxAge: 86400});
                    if(rememberMe){
                        localStorage.setItem("user", JSON.stringify(response.data.payload.user));
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setFail(true);
            });
    };
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
                        <div className='message'>
                            {errorMsg}
                        </div>
                    }
                    <div className="options">
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            Remember me
                        </label>
                        <Link href="/forgot-password" className='forgot-password-link'>Forgot password?</Link>
                    </div>
                    <div>
                        {loading ? (
                            <div className="loading">Đang xử lý, vui lòng đợi...</div>
                        ) : (
                            <input
                                type="submit"
                                className="btn"
                                value="Login"
                            />
                        )}
                    </div>
                    <div className='register'>
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

