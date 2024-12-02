import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useCookies} from "react-cookie";
import {request} from "../api/axios";

export function Register() {
    const router = useRouter();
    const [cookies] = useCookies(["authToken"]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    // Redirect logged-in users
    useEffect(() => {
        const token = cookies.authToken;
        if (token && token !== "undefined") router.push('/');
    }, [cookies]);

    const validateForm = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError(true);
            setErrorMsg('Tài khoản không hợp lệ');
            return false;
        }
        if (password.trim() === '') {
            setError(true);
            setErrorMsg('Mật khẩu không được để trống');
            return false;
        }
        if (name.trim() === '') {
            setError(true);
            setErrorMsg('Tên không được để trống');
            return false;
        }
        if (address.trim() === '') {
            setError(true);
            setErrorMsg('Hãy điền địa chỉ tạm thời của bạn');
            return false;
        }
        if (dob.trim() === '') {
            setError(true);
            setErrorMsg('Hãy nhập vào ngày sinh của bạn');
            return false;
        }
        setError(false);
        setErrorMsg('');
        return true;
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await request("POST", "/api/auth/registration", {email, password, name, address, dob});
            setLoading(false);
            if (response.status === 200) {
                setSuccess(true);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            setError(true);
            setErrorMsg('Đăng ký không thành công. Thử lại sau.');
        }
    };

    return (
        <div className='register-container'>
            <h1 className='register-header'>ĐĂNG KÝ TÀI KHOẢN</h1>
            <div className='register-form'>
                {success ? (
                    <h1>Một đường link kích hoạt tài khoản đã được gửi qua email của bạn. Truy cập vào đường link để
                        hoàn tất đăng ký</h1>
                ) : (
                    <>
                        <h2 className='form-title'>ĐĂNG KÝ</h2>
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
                            <input
                                type="text"
                                className="input-field"
                                id="name-input"
                                value={name}
                                placeholder='Your name'
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div className='address-dob-container'>
                                <input
                                    type="text"
                                    className="input-field"
                                    id="address-input"
                                    value={address}
                                    placeholder='Address'
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                                <input
                                    type="date"
                                    className='input-field'
                                    id='dob-input'
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className='error-message'>{errorMsg}</div>}
                            {success && <div className='success-message'>Đăng ký thành công</div>}
                            <div className="options-container">
                                <Link href="/login" className='login-link'>Đã có tài khoản?</Link>
                            </div>
                            <div>
                                {loading ? (
                                    <div className="loading">Đang xử lý, vui lòng đợi...</div>
                                ) : (
                                    <input
                                        type="submit"
                                        className="submit-btn"
                                        value={success ? "Đi trang đăng nhập" : "Sign up"}
                                    />
                                )}
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
