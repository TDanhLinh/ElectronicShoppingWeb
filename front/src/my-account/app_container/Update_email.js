import { useState, useEffect } from 'react';

export function UpdateEmail() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Lấy ra email người dùng từ database
    }, [])

    const clickButton = () => {
        if (success) return;

        if (email === '') {
            setError(true);
            setErrorMsg('Chưa điền đầy đủ thông tin');
            return;
        }
        // cập nhật email mới lên database

        setError(false);
        setSuccess(true);
        setEmail('');
    }
    
    return (
        <div className="user-information">
            <div className="user-information-header">Cập nhật email</div>
            <div className="user-information-container" style={{justifyContent:'center'}}>
                <div className='container-box'>
                    <div className='box-text'>Email</div>
                    <input
                        type='text'
                        className='box-input'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {
                        error &&
                        <div className='error-msg'>{errorMsg}</div>
                    }
                    <button className='box-btn' onClick={clickButton}>{success ? 'Thành công': 'Lưu thay đổi'}</button>
                </div>
            </div>
        </div>
    )
}