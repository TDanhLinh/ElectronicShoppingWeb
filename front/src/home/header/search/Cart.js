import { useState } from "react"

export function Cart() {
    const [cart, setCart] = useState([
        {
            src: 'https://img.abaha.vn/photos/resized/320x/83-1596776828-myphamohui-lgvina.png',
            name: 'Bộ cấp nước se khít lỗ chân lông Sum37 Warer-full Set 5p',
            price: '450.000đ',
            qnt: '2',
            description: 'Phân loại: Bạc'
        },
        {
            src: 'https://img.abaha.vn/photos/resized/320x/73-1574413855-myohui.png',
            name: 'Set dưỡng trắng trị nám Whoo Gong Jin Hyand Seol 5 món',
            price: '390.000đ',
            qnt: '1',
            description: 'Phân loại: Vàng'
        },
        {
            src: 'https://img.abaha.vn/photos/resized/320x/73-1573129886-myohui.png',
            name: 'Set tái sinh Su:M37 Losec Summa 5 món',
            price: '850.000đ',
            qnt: '3',
            description: 'Phân loại: Kim cương'
        },
    ])

    return (
        <div className="header__cart">
            <div className="header__cart-wrap">
                <i className="header__cart-icon fas fa-shopping-cart"></i>
                <span className="header__cart-notice">3</span>
                <div className="header__cart-list">
                    <img src="./assets/img/noCart.png" alt="" className="header__cart-list--noCart-img"/>
                    <span className="header__cart-list-no-cart-msg">
                        Chưa có sản phẩm
                    </span>
                    <h4 className="header__cart-heading">Sản phẩm đã thêm </h4>
                    <ul className="header__cart-list-item">
                        {
                            cart.map((item, index) => (
                                <li key={index} className="header__cart-item">
                                    <img src={item.src} alt="" className="header__cart-img"/>
                                    <div className="header__cart-item-info">
                                        <div className="header__cart-item-head">
                                            <h5 className="header__cart-item-name">{item.name}</h5>
                                            <div className="header__cart-price-wrap">
                                                <span className="header__cart-item-price">{item.price}</span>
                                                <span className="header__cart-item-multiply">x</span>
                                                <span className="header__cart-item-qnt">{item.qnt}</span>
                                            </div>
                                        </div>
                                        <div className="header__cart-item-body">
                                            <span className="header__cart-item-description">{item.description}</span>
                                            <span className="header__cart-item-remove hide-on-mobile-tablet">Xóa</span>
                                            <button className="btn btn--primary header__cart-item-remove-btn">
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <a href="" className="header__cart--view btn btn--primary">Xem giỏ hàng</a>
                </div>
            </div>
        </div>
    )
}