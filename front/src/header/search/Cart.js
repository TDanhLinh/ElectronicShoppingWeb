import { useState, useEffect } from "react"
import Link from "next/link";

export function Cart() {
    const [cart, setCart] = useState([])
    
    useEffect(() => {
        // lấy thông tin về sản phẩm trong giỏ hàng, chưa có axios
        const sampleItems = [
            {
                id: 1,
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2OWZC_tivnVl1D5HIDzKnJj0MX8uksIqNfg&s',
                name: 'ROLEX YACHT-MASTER 40 MM',
                quantity: 2,
                originalPrice: 60000000,
                discountedPrice: 39000000,
                shippingFee: 25000,
            },
            {
                id: 2,
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE1o70KztHpRohL_lfZAxUOsA57FDvY71YTQ&s',
                name: 'Iphone 15 pro max',
                quantity: 1,
                originalPrice: 8000000,
                discountedPrice: 6000000,
                shippingFee: 30000,
            },
            {
                id: 3,
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXp_vMn-caMedxr7zsnhI3Lz59Nl2sWNWD0A&s',
                name: 'Macbook pro',
                quantity: 3,
                originalPrice: 7400000,
                discountedPrice: 5500000,
                shippingFee: 30000,
            },
        ]

        setCart(sampleItems);
    }, [])
    
    // xóa sản phẩm ra khỏi cart, chưa có axios
    const removeItem = (id) => {
        const updateCart = cart.filter(item => item.id !== id);
        setCart(updateCart);
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
                                    cart.slice(0, 3).map((item, index) => (
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