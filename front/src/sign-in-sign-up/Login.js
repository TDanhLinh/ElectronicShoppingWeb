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
    const [fail, setFail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cookies, setCookie] = useCookies(["authToken"]);

    // If the user is already logged in, redirect to the home page
    useEffect(() => {
        const token = cookies.authToken;
        if (token && token !== "undefined") router.push('/');
    }, []);

    const submit = async (e) => {
        e.preventDefault();
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
    );
}
