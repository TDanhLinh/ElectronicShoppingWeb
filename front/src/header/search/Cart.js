import { useState, useEffect } from "react"
import Link from "next/link";
import { sampleProducts } from "./SampleProducts";
import { useRouter } from 'next/router';

export function Cart() {
    const router = useRouter();

    const [cart, setCart] = useState([])
    
    useEffect(() => {
        // lấy thông tin về sản phẩm trong giỏ hàng, chưa có axios
        
        setCart(sampleProducts);
    }, [])
    
    // xóa sản phẩm ra khỏi cart, chưa có axios
    const removeItem = (id) => {
        const updateCart = cart.filter(item => item.id !== id);
        setCart(updateCart);
    }

    const clickOnItem = (id) => {
        router.push(`/products/${id}`)
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
                                            <img src={item.src} className="header__cart-img" onClick={() => clickOnItem(item.id)}/>
                                            <div className="header__cart-item-info">
                                                <div className="header__cart-item-head">
                                                    <h5 className="header__cart-item-name" onClick={() => clickOnItem(item.id)}>{item.name}</h5>
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