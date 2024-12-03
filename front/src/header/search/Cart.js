import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { sampleProducts } from "./SampleProducts"; // Ensure this is correctly defined or replace with actual cart data

export function Cart() {
    const router = useRouter();

    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Retrieve user information from localStorage
        const account = localStorage.getItem('user');

        if (account) {
            setIsLoggedIn(true);
            // If user is logged in, fetch the cart (replace with actual cart fetching logic)
            const cartData = JSON.parse(localStorage.getItem('cart')) || sampleProducts; // Retrieve cart from localStorage
            setCart(cartData);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // Remove item from cart
    const removeItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        // Optionally, update the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clickOnItem = (id) => {
        router.push(`/products/${id}`);
    };

    return (
        <div className="header__cart">
            <div className="header__cart-wrap">
                <Link href='/payment'>
                    <i className="header__cart-icon fas fa-shopping-cart"></i>
                </Link>
                <span className="header__cart-notice">{cart.length}</span>
                <div className="header__cart-list">
                    {cart.length === 0 ? (
                        <div className="header__cart-list-no-cart">
                            <img src="./assets/img/noCart.png" alt="" className="header__cart-list-no-cart-img" />
                            <span className="header__cart-list-no-cart-msg">
                                Chưa có sản phẩm
                            </span>
                        </div>
                    ) : (
                        <div>
                            <h4 className="header__cart-heading">Sản phẩm đã thêm </h4>
                            <ul className="header__cart-list-item">
                                {cart.map((item, index) => (
                                    <li key={index} className="header__cart-item">
                                        <img
                                            src={item.src}
                                            className="header__cart-img"
                                            onClick={() => clickOnItem(item.id)}
                                        />
                                        <div className="header__cart-item-info">
                                            <div className="header__cart-item-head">
                                                <h5
                                                    className="header__cart-item-name"
                                                    onClick={() => clickOnItem(item.id)}
                                                >
                                                    {item.name}
                                                </h5>
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
                                ))}
                            </ul>
                            <Link href="/payment" className="header__cart--view btn btn--primary">Xem giỏ hàng</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
