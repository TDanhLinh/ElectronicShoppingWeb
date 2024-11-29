import { useState, useEffect } from 'react';

export function DeleteAccount() {
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // lấy ra mật khẩu từ database, lưu vào biến password
    }, [])

    const clickButton = () => {
        if (success) return;

        // kiểm tra password người dùng nhập vào
        if (oldPassword === '') {
            setError(true);
            setErrorMsg('Chưa điền đầy đủ thông tin');
            return;
        }
        if (oldPassword !== password) {
            setError(true);
            setErrorMsg('Mật khẩu không đúng');
            return;
        }

        // update mật khẩu mới lên database

        setError(false);
        setSuccess(true);
        setOldPassword('');
    }
    
    return (
        <div className="user-information">
            <div className="user-information-header">Xóa tài khoản</div>
            <div className="user-information-container" style={{justifyContent:'center'}}>
            <div className='container-box'>
                    <div className='box-text'>Nhập mật khẩu để gửi yêu cầu xóa tài khoản lên hệ thống</div>
                    <input
                        type='password'
                        className='box-input'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    {
                        error &&
                        <div className='error-msg'>{errorMsg}</div>
                    }
                    <button className='box-btn' onClick={clickButton}>{success ? 'Gửi yêu cầu thành công': 'Gửi yêu cầu'}</button>
                </div>
            </div>
        </div>
    )
}