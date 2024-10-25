export function Mobile_select() {
    return (
        <div className="header__mobile-select">
            <label htmlFor="select-bar-nav">
                <i className="header__mobile-select-icon fas fa-list"></i>
            </label>
            <input type="checkbox" name="" id="select-bar-nav"></input>
            <label htmlFor="select-bar-nav" className="header__mobile-select-overlay"></label>
            <nav className="header__mobile-select-nav">
                <div className="user-info">
                    <img src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-1/cp0/p24x24/90036007_2499969533665706_4595658836861255680_n.jpg?_nc_cat=100&ccb=2&_nc_sid=7206a8&_nc_ohc=nSkTo8HrqeMAX_ZCQad&_nc_ht=scontent.fvca1-2.fna&tp=27&oh=ad01830402338246d82a099c5e88f237&oe=5FBDC404" alt="" className="header__navbar-user-img"/>
                    <span className="user-name">He he he</span>
                </div>
                <label htmlFor="select-bar-nav" className="header__mobile-select-close">
                    <i className="fas fa-times"></i>
                </label>                            
                <ul className="header__mobile-select-list">
                    <li className="header__mobile-select-item">
                        <a href="" className="header__mobile-select-link">Thông tin cá nhân</a>
                    </li>
                    <li className="header__mobile-select-item">
                        <a href="" className="header__mobile-select-link">Giỏ hàng</a>
                    </li>
                    <li className="header__mobile-select-item">
                        <a href="" className="header__mobile-select-link">Liên hệ với chúng tôi</a>
                    </li>
                    <li className="header__mobile-select-item">
                        <a href="" className="header__mobile-select-link header__mobile-select-logout">Đăng xuất</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}