import { useState, useEffect } from "react"
import Link from "next/link";

export function Cart() {
    const [cart, setCart] = useState([])

    useEffect(() => {
        const tempCart = localStorage.getItem('cartItems');
        if (tempCart) {
            setCart(JSON.parse(tempCart));
        }
        else {
            const sampleItems = [
                {
                    id: 1,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1596776828-myphamohui-lgvina.png',
                    name: 'Bộ cấp nước se khít lỗ chân lông Sum37 Warer-full Set 5p',
                    quantity: 2,
                    originalPrice: 60000,
                    discountedPrice: 39000,
                    shippingFee: 25000,
                },
                {
                    id: 2,
                    src: 'https://img.abaha.vn/photos/resized/320x/73-1574413855-myohui.png',
                    name: 'Set dưỡng trắng trị nám Whoo Gong Jin Hyand Seol 5 món',
                    quantity: 1,
                    originalPrice: 80000,
                    discountedPrice: 60000,
                    shippingFee: 30000,
                },
                {
                    id: 3,
                    src: 'https://img.abaha.vn/photos/resized/320x/73-1573129886-myohui.png',
                    name: 'Set tái sinh Su:M37 Losec Summa 5 món',
                    quantity: 3,
                    originalPrice: 80000,
                    discountedPrice: 60000,
                    shippingFee: 30000,
                },
            ]

            setCart(sampleItems);
            localStorage.setItem('cartItems', JSON.stringify(sampleItems));
        }
    }, [])

    const removeItem = (id) => {
        const updateCart = cart.filter(item => item.id !== id);
        setCart(updateCart);
        localStorage.setItem('cartItems', JSON.stringify(updateCart));
    }

    return (
        <div className="header__cart">
            <div className="header__cart-wrap">
                <Link href='/payment'>
                    <i className="header__cart-icon fas fa-shopping-cart"></i>
                </Link>
                <span className="header__cart-notice">{cart.length}</span>
                <div className="header__cart-list">
                    {
                        (cart.length === 0) && 
                        <div className="header__cart-list-no-cart">
                            <img src="./assets/img/noCart.png" alt="" className="header__cart-list-no-cart-img"/>
                            <span className="header__cart-list-no-cart-msg">
                                Chưa có sản phẩm
                            </span>
                        </div>
                    }
                    {
                        (cart.length > 0) &&
                        <div>
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
                                                        <span className="header__cart-item-discounted-price">
                                                            {item.discountedPrice.toLocaleString()}đ
                                                        </span>
                                                        <span className="header__cart-item-multiply">x</span>
                                                        <span className="header__cart-item-qnt">{item.quantity}</span>
                                                    </div>
                                                </div>
                                                <div className="header__cart-item-body">
                                                    <span className="header__cart-item-original-price">
                                                        {item.originalPrice.toLocaleString()}đ
                                                    </span>
                                                    <span 
                                                        className="header__cart-item-remove"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        Xóa
                                                    </span>
                                                    <button className="btn btn--primary header__cart-item-remove-btn">
                                                        <i className="fas fa-times"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <Link href="/payment" className="header__cart--view btn btn--primary">Xem giỏ hàng</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}