import { useState, useEffect } from 'react';

export function UpdatePhonenumber() {
    const [sdt, setSdt] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // Lấy ra sđt người dùng từ database
    }, [])

    const clickButton = () => {
        if (success) return;

        if (sdt === '') {
            setError(true);
            setErrorMsg('Chưa điền đầy đủ thông tin');
            return;
        }
        // cập nhật sđt mới lên database
        
        setError(false);
        setSuccess(true);
        setSdt('');
    }
    
    return (
        <div className="user-information">
            <div className="user-information-header">Cập nhật số điện thoại</div>
            <div className="user-information-container" style={{justifyContent:'center'}}>
                <div className='container-box'>
                    <div className='box-text'>Số điện thoại</div>
                    <input
                        type='text'
                        className='box-input'
                        value={sdt}
                        onChange={(e) => setSdt(e.target.value)}
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