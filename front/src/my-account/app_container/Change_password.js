import { useState, useEffect } from 'react';

export function ChangePassword() {
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // lấy ra mật khẩu từ database, lưu vào biến password
    }, [])

    const clickButton = () => {
        if (success) return;

        // kiểm tra password người dùng nhập vào
        if (oldPassword === '' || newPassword === '' || reEnterPassword === '') {
            setError(true);
            setErrorMsg('Chưa điền đầy đủ thông tin');
            return;
        }
        if (oldPassword !== password) {
            setError(true);
            setErrorMsg('Mật khẩu cũ không đúng');
            return;
        }
        if (newPassword !== reEnterPassword) {
            setError(true);
            setErrorMsg('Nhập lại mật khẩu không đúng');
            return;
        }

        // update mật khẩu mới lên database

        setError(false);
        setSuccess(true);
        setOldPassword('');
        setNewPassword('');
        setReEnterPassword('');
    }

    return (
        <div className="user-information">
            <div className="user-information-header">Thay đổi mật khẩu</div>
            <div className="user-information-container" style={{justifyContent:'center'}}>
                <div className='container-box'>
                    <div className='box-text'>Mật khẩu cũ</div>
                    <input
                        type='password'
                        className='box-input'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    <div className='box-text'>Nhập vào mật khẩu mới</div>
                    <input
                        type='password'
                        className='box-input'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <div className='box-text'>Nhập lại mật khẩu mới</div>
                    <input
                        type='password'
                        className='box-input'
                        value={reEnterPassword}
                        onChange={(e) => setReEnterPassword(e.target.value)}
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