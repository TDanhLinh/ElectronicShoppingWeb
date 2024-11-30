import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function Register() {
    const router = useRouter();

    // Nếu đã đăng nhập, chuyển trang chính
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user && user.length > 0) router.push('/');
    }, [])
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [exist, setExist] = useState(false); // kiểm tra tài khoản đã tồn tại chưa
    const [address, setAddress] = useState("");
    const [success, setSuccess] = useState(false); // kiểm tra đăng ký thành công chưa
    const [notify, setNotify] = useState(false);
    const [dob, setDob] = useState('');
    
    const submit = (e) => {
        e.preventDefault();

        if (success) {
            // nếu đã ấn nút đăng ký, nút đăng ký thành 'chuyển sang trang đăng nhập'
            router.push("/login");
            return;
        }

        const newAccount = {
            email: email,
            password: password,
            name: name,
            address: address,
            dob: dob,
            role: 0 // role = 0: user, role = 1: seller, role = 2: admin
        }

        // thêm tài khoản mới vào database, hiện tại chưa dùng axios
        const accounts = localStorage.getItem("accounts");

        if (accounts) { // kiểm tra xem tài khoản đã tồn tại chưa
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
        else { // chưa tồn tại thì thêm vào database, hiện tại chưa có axios
            localStorage.setItem(email, JSON.stringify(newAccount));
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
                    <input
                        type="text"
                        className="input-box"
                        id="name"
                        value={name}
                        placeholder='Your name'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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