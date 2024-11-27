import { useEffect, useState } from 'react';

export function User_information({setCategory}) {
    const [user, setUser] = useState({}); // chứa các thông tin như tên, sđt, email, ....
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [nation, setNation] = useState('');

    useEffect(() => {
        // lấy ra thông tin người dùng, hiện chưa có axios
        const account = localStorage.getItem('user');
        let acc = JSON.parse(localStorage.getItem(account));
        if (!acc.img) acc.img = "https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg";
        setUser(acc);

        setName(user.name);
        if (user.nickname) setNickname(user.nickname);
        setDob(user.dob);
        if (user.gender) setGender(user.gender);
        if (user.nation) setNation(user.nation);
    }, [])

    // cập nhật các thông tin đã có lên database
    const changeUserInformation = () => {

    }

    // chuyển sang trang 'tính năng đang phát triển'
    const underDevelopment = () => {
        window.location.href = '/under-dev'
    }
    
    return (
        <div className="user-information">
            <div className="user-information-header">Thông tin tài khoản</div>
            <div className="user-information-container">
                <div className="user-information-personal">
                    <div className="user-information-p">Thông tin cá nhân</div>
                    <div className="form-info">
                        <div className="form-avatar">
                            <img src={user.img} className='default' alt='avatar'/>
                            <div className='edit'>
                                <img src='https://frontend.tikicdn.com/_desktop-next/static/img/account/edit.png' className='edit_img'/>
                            </div>
                        </div>
                        <div className='form-name'>
                            <div className='name'>
                                <div className='name-p'>Họ & Tên</div>
                                <input
                                    type='text'
                                    className='input-name-box'
                                    value={name}
                                    placeholder='Tên mới'
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='name'>
                                <div className='name-p'>Nickname</div>
                                <input
                                    type='text'
                                    className='input-name-box'
                                    value={nickname}
                                    placeholder='Thêm nickname'
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='form-other'>
                        <div className="name-p">Ngày sinh</div>
                        <input
                            type="date"
                            className='input-dob-box'
                            value={dob}
                            onChange={(e) => setDob(e.target.value)} 
                            required
                        />
                    </div>
                    <div className='form-other'>
                        <div className="name-p">Giới tính</div>
                        <div className='gender-option'>
                            <label className='gender-label'>
                                <input
                                    type='radio'
                                    name='gen'
                                    value='male'
                                    checked={gender === 'male'}
                                    className='gender-radio'
                                    onChange={(e) => setGender(e.target.value)} 
                                />
                                <span className='gender-type'>Nam</span>
                            </label>
                            <label className='gender-label'>
                                <input
                                    type='radio'
                                    name='gen'
                                    value='female'
                                    checked={gender === 'female'}
                                    className='gender-radio'
                                    onChange={(e) => setGender(e.target.value)} 
                                />
                                <span className='gender-type'>Nữ</span>
                            </label>
                            <label className='gender-label'>
                                <input
                                    type='radio'
                                    name='gen'
                                    value='other'
                                    checked={gender === 'other'}
                                    className='gender-radio'
                                    onChange={(e) => setGender(e.target.value)} 
                                />
                                <span className='gender-type'>Khác</span>
                            </label>
                        </div>
                    </div>
                    <div className='form-other'>
                        <div className="name-p">Quốc tịch</div>
                        <input
                            type="text"
                            className='input-nation-box'
                            value={nation}
                            placeholder='Việt Nam'
                            onChange={(e) => setNation(e.target.value)} 
                        />
                    </div>
                    <div className='form-other'>
                        <button
                            className='set-change-btn'
                            onClick={changeUserInformation}
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
                <div className="user-information-phonenumber-email">
                    <div className='user-information-wrapper'>
                        <div className="user-information-p">Số điện thoại và Email</div>
                        <div className='form-sdt-email-other'>
                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png" className='icon-png'/>
                            <div className='user-sdt-email'>
                                <div className='user-sdt-email-detail'>Số điện thoại</div>
                                <div className='user-sdt-email-detail'>{user.phonenumber || ''}</div>
                            </div>
                            <div className='update-btn-container'>
                                <span></span>
                                <button
                                    className='update-btn'
                                    onClick={() => setCategory("Cập nhật sđt")}
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                        <div className='form-sdt-email-other'>
                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png" className='icon-png'/>
                            <div className='user-sdt-email'>
                                <div className='user-sdt-email-detail'>Địa chỉ email</div>
                                <div className='user-sdt-email-detail'>{user.email || 'abc@gmail.com'}</div>
                            </div>
                            <div className='update-btn-container'>
                                <span></span>
                                <button
                                    className='update-btn'
                                    onClick={() => setCategory("Cập nhật email")}
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='user-information-wrapper'>
                        <div className="user-information-p">Bảo mật</div>
                        <div className='form-sdt-email-other'>
                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/lock.png" className='icon-png'/>
                            <div className='user-sdt-email'>
                                <div className='user-sdt-email-detail'>Thay đổi mật khẩu</div>
                                <div className='user-sdt-email-detail'></div>
                            </div>
                            <div className='update-btn-container'>
                                <span></span>
                                <button
                                    className='update-btn'
                                    onClick={() => setCategory("Thay đổi mật khẩu")}
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                        <div className='form-sdt-email-other'>
                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg" className='icon-png'/>
                            <div className='user-sdt-email'>
                                <div className='user-sdt-email-detail'>Yêu cầu xóa tài khoản</div>
                                <div className='user-sdt-email-detail'></div>
                            </div>
                            <div className='update-btn-container'>
                                <span></span>
                                
                                <button
                                    className='update-btn'
                                >
                                    Yêu cầu
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='user-information-wrapper'>
                        <div className="user-information-p">Liên kết mạng xã hội</div>
                        <div className='form-sdt-email-other'>
                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/facebook.png" className='icon-png'/>
                            <div className='user-sdt-email'>
                                <div className='user-sdt-email-detail'>Facebook</div>
                                <div className='user-sdt-email-detail'></div>
                            </div>
                            <div className='update-btn-container'>
                                <span></span>
                                <button
                                    className='update-btn'
                                    onClick={underDevelopment}
                                >
                                    Liên kết
                                </button>
                            </div>
                            
                        </div>
                        <div className='form-sdt-email-other'>
                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/google.png" className='icon-png'/>
                            <div className='user-sdt-email'>
                                <div className='user-sdt-email-detail'>Google</div>
                                <div className='user-sdt-email-detail'></div>
                            </div>
                            <div className='update-btn-container'>
                                <span></span>
                                <button
                                    className='update-btn'
                                    onClick={underDevelopment}
                                >
                                    Liên kết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}