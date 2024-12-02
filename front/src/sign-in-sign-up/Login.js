import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { request } from "../api/axios";
import { useCookies } from "react-cookie";

export function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(["authToken"]);

    // Redirect to home page if already logged in
    useEffect(() => {
        const token = cookies.authToken;
        if (token && token !== "undefined") {
            router.push('/');
        }
    }, [cookies]);

    const validateInput = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError(true);
            setErrorMsg('Tài khoản không hợp lệ');
            return false;
        }

        if (!password.trim()) {
            setError(true);
            setErrorMsg('Mật khẩu không được để trống');
            return false;
        }

        setError(false); // Reset error state if validation passes
        setErrorMsg('');
        return true;
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!validateInput()) return;

        setLoading(true);

        try {
            const response = await request("POST", "/api/auth/login", { email, password });

            if (response.status === 200) {
                // Store token in cookie
                setCookie("authToken", response.data.payload.token, { path: "/", maxAge: 86400 });
                localStorage.setItem("user", JSON.stringify(response.data.payload.user));

                // Redirect to homepage
                router.push("/");
            }
        } catch (err) {
            console.error(err);
            setError(true);
            setErrorMsg("Tài khoản hoặc mật khẩu không đúng");
        } finally {
            setLoading(false);
        }
    };

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
                    {error && <div className='message'>{errorMsg}</div>}
                    <div className="options">
                        <Link href="/forgot-password" className='forgot-password-link'>Forgot password?</Link>
                    </div>
                    <br/>
                    <div>
                        {loading ? (
                            <div className="loading">Đang xử lý, vui lòng đợi...</div>
                        ) : (
                            <input
                                type="submit"
                                className="register-btn"
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
    );
}
