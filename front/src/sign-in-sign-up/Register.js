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
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dob, setDob] = useState('');

    useEffect(() => {
        const token = cookies.authToken;
        if (token && token !== "undefined") router.push('/');
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await request("POST", "/api/auth/registration", {email, password, name})
            .then((response) => {
                setLoading(false);
                console.log(response);
                if (response.status === 200) {
                    setSuccess(true);
                }
            }).catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }

    return (
        <div className='register-container'>
            <h1 className='register-header'>ĐĂNG KÝ TÀI KHOẢN</h1>
            <div className='register-form'>
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
                    {!success && (<div className='error-message'>Tài khoản đã tồn tại</div>)}
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
                                value={(success === false) ? "Sign up" : "Đi trang đăng nhập"}
                            />
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
