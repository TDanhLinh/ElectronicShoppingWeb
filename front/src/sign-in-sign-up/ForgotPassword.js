import { useState, useEffect } from 'react';

export function ForgotPassword() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user && user.length > 0) window.location.href = '/';
        }
    })
    
    const [email, setEmail] = useState("");
    const [send, setSend] = useState(false);
    
    const submit = (e) => {
        e.preventDefault();
        if (send === false) setSend(true);
        else window.location.href = '/login';
    }
    
    return (
        <div className='container'>
            <h1 className='describe'>TÌM LẠI MẬT KHẨU</h1>
            <div className='form'>
                <h2>NHẬP EMAIL</h2>
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
                    {send && (<div className='message' style={{color: 'rgb(105, 19, 19)',}}>Đã gửi mật khẩu qua email</div>)}
                    <input
                        type="submit"
                        className="btn"
                        value={(send === false) ? "Gửi" : "Quay lại trang đăng nhập"}
                    />
                </form>
            </div>
        </div>
    )
}