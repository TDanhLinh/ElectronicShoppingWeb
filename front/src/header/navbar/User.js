export function User() {
    return (
        <li className="header__navbar-item header__navbar-user">
            <img src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-1/cp0/p24x24/90036007_2499969533665706_4595658836861255680_n.jpg?_nc_cat=100&ccb=2&_nc_sid=7206a8&_nc_ohc=nSkTo8HrqeMAX_ZCQad&_nc_ht=scontent.fvca1-2.fna&tp=27&oh=ad01830402338246d82a099c5e88f237&oe=5FBDC404" alt="" className="header__navbar-user-img"/>
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