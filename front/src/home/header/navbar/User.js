export function User() {
    
    
    return (
        <li className="header__navbar-item header__navbar-user">
            <img src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg" alt="" className="header__navbar-user-img"/>
            <span className="header__navbar-user-name">He he he</span>

            <ul className="header__navbar-user-menu">
                <li className="header__navbar-user-item">
                    <a href="">Tài khoản của tôi</a>
                </li>
                <li className="header__navbar-user-item">
                    <a href="">Địa chỉ của tôi</a>
                </li>
                <li className="header__navbar-user-item">
                    <a href="">Đơn mua</a>
                </li>
                <li className="header__navbar-user-item header__navbar-user-item--separate">
                    <a href="">Đăng xuất</a>
                </li>
            </ul>
        </li>
    )
}