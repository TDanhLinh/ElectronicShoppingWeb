import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Register() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user && user.length > 0) window.location.href = '/';
        }
    }, [])
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [exist, setExist] = useState(false);
    const [address, setAddress] = useState("");
    const [success, setSuccess] = useState(false);
    const [notify, setNotify] = useState(false);
    const [dob, setDob] = useState('');
    
    const submit = (e) => {
        e.preventDefault();

        if (success) {
            window.location.href = "/login";
            return;
        }

        const newAccount = {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            address: address,
            dob: dob,
            role: 0
        }

        const accounts = localStorage.getItem("accounts");

        if (accounts) {
            const Accounts = JSON.parse(accounts);
            if (Accounts.find((item) => (item.email === email))) {
                setExist(true);
            }
            else {
                localStorage.setItem(email, JSON.stringify(newAccount));
                Accounts.push(newAccount);
                localStorage.setItem("accounts", JSON.stringify(Accounts));
                setSuccess(true);
                setExist(false);
            }
        }
        else {
            const Accounts = [newAccount];
            localStorage.setItem("accounts", JSON.stringify(Accounts));
            setSuccess(true);
            setExist(false);
        }
    }

    return (
        <div className='container'>
            <h1 className='describe'>ĐĂNG KÝ TÀI KHOẢN</h1>
            <div className='form'>
                <h2>ĐĂNG KÝ</h2>
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
                    <div className='name'>
                        <input
                            type="text"
                            className="input-box"
                            id="firstname"
                            value={firstname}
                            placeholder='First name'
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="input-box"
                            id="lastname"
                            value={lastname}
                            placeholder='Last name'
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>
                    <div className='address-dob'>
                        <input
                            type="text"
                            className="input-box"
                            id="address"
                            value={address}
                            placeholder='Address'
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            className='input-box'
                            id='dob'
                            value={dob}
                            onChange={(e) => setDob(e.target.value)} 
                            required
                        />
                    </div>
                    {exist && (<div className='message'>Tài khoản đã tồn tại</div>)}
                    {success && (<div className='message' style={{color: 'rgb(105, 19, 19)'}}>Đăng ký thành công</div>)}
                    <div className="options">
                        <label>
                            <input 
                                type="checkbox" 
                                onChange={() => setNotify(!notify)}
                            />
                            Nhận thông báo email
                        </label>
                        <Link href="/login" className='forgot-password'>Đã có tài khoản?</Link>
                    </div>
                    <input
                        type="submit"
                        className="btn"
                        value={(success === false) ? "Sign up" : "Đi trang đăng nhập"}
                    />
                </form>
            </div>
        </div>
    )
}