import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Register() {
    const router = useRouter();

    // nếu đã đăng nhập rồi, chuyển sang trang chủ  
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user && user.length > 0) router.push('/');
    }, [])
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [success, setSuccess] = useState(false);
    const [notify, setNotify] = useState(false);
    const [dob, setDob] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    const submit = (e) => {
        e.preventDefault();

        if (success) {
            router.push("/login"); // nếu đăng ký tài khoản thành công, nút đăng ký trở thành 
                                   // nút quay sang trang đăng nhập và ấn vào sẽ ra trang đăng nhập
            return;
        }

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

        if (name === '') {
            setError(true);
            setErrorMsg('Tên không được để trống');
            return;
        }

        if (address === '') {
            setError(true);
            setErrorMsg('Hãy điền địa chỉ tạm thời của bạn');
            return;
        }

        if (dob === '') {
            setError(true);
            setErrorMsg('Hãy nhập vào ngày sinh của bạn');
            return;
        }

        // thêm tài khoản vào database, hiện chưa có axios
        const newAccount = {
            email: email,
            password: password,
            name: name,
            address: address,
            dob: dob,
            role: 0 // role = 0: user
        }

        const accounts = localStorage.getItem("accounts");

        if (accounts) {
            const Accounts = JSON.parse(accounts);
            if (Accounts.find((item) => (item.email === email))) {
                setError(true);
                setErrorMsg('Tài khoản đã tồn tại');
            }
            else {
                localStorage.setItem(email, JSON.stringify(newAccount));
                Accounts.push(newAccount);
                localStorage.setItem("accounts", JSON.stringify(Accounts));
                setSuccess(true);
                setError(false);
            }
        }
        else {
            localStorage.setItem(email, JSON.stringify(newAccount));
            const Accounts = [newAccount];
            localStorage.setItem("accounts", JSON.stringify(Accounts));
            setSuccess(true);
            setError(false);
        }
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
                    {
                        error && 
                        <div className='error-message'>{errorMsg}</div>
                    }
                    {
                        success && 
                        <div className='success-message'>Đăng ký thành công</div>
                    }
                    <div className="options-container">
                        <label htmlFor="notify">
                            <input 
                                type="checkbox" 
                                id="notify"
                                onChange={() => setNotify(!notify)}
                            />
                            Nhận thông báo email
                        </label>
                        <Link href="/login" className='login-link'>Đã có tài khoản?</Link>
                    </div>
                    <input
                        type="submit"
                        className="submit-btn"
                        value={(success === false) ? "Sign up" : "Đi trang đăng nhập"}
                    />
                </form>
            </div>
        </div>
    )
}
