import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export function ForgotPassword() {
    const router = useRouter();

    // nếu đã đăng nhập rồi, chuyển sang trang chủ
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user && user.length > 0) router.push('/');
    }, [])
    
    const [email, setEmail] = useState("");
    const [send, setSend] = useState(false);
    
    const submit = (e) => {
        e.preventDefault();
        if (send === false) {
            // Gửi yêu cầu tìm lại mật khẩu dựa trên email lên server
            setSend(true);
        }
        else router.push('/login');
    }
    
    return (
        <div className='forgot-password-container'>
            <h1 className='forgot-password-header'>TÌM LẠI MẬT KHẨU</h1>
            <div className='forgot-password-form'>
                <h2 className='form-title'>NHẬP EMAIL</h2>
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
                    {send && (<div className='success-message'>Đã gửi mật khẩu qua email</div>)}
                    <div className="options-container">
                        <Link href="/login" className='login-link'>Quay lại trang đăng nhập</Link>
                    </div>
                    <input
                        type="submit"
                        className="submit-btn"
                        value={(send === false) ? "Gửi" : "Quay lại trang đăng nhập"}
                    />
                </form>
            </div>
        </div>
    )
}
