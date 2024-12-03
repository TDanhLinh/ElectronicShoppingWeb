import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {request} from "../api/axios";
import {useCookies} from "react-cookie";

export function Payment() {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(["authToken"]);

    useEffect(() => {
        const token = cookies.authToken;
        if (!token || token === "undefined") {
            router.push('/login');
        }
    }, []);

    const [user, setUser] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [success, setSuccess] = useState(false);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng');
    const [name, setName] = useState('');
    const [sdt, setSdt] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Fetch cart data from the API
    useEffect(() => {
        request("GET", "/client-api/carts").then((response) => {
            setCartItems(response.data.payload.cartItems); // Adjusted to access the correct path in the response
        });
        if (user.sdt) setSdt(user.sdt);
    }, []);

    // Update local storage when cart changes
    const updateLocalStorage = (items) => {
        localStorage.setItem("cartItems", JSON.stringify(items));
    };

    // Remove item from cart
    const handleRemoveItem = (itemId) => {
        const updatedItems = cartItems.filter(item => item.cartItemVariant.variantId !== itemId);
        setCartItems(updatedItems);
        updateLocalStorage(updatedItems);
    };

    // Calculate subtotal and shipping
    const subtotal = cartItems.reduce((acc, item) => acc + item.cartItemVariant.variantPrice * item.cartItemQuantity, 0);
    const shippingFee = cartItems.reduce((acc, item) => acc + item.cartItemVariant.shippingFee || 0, 0);
    const total = subtotal + shippingFee;

    // Handle order placement
    const clickOnOrder = () => {
        if (success) return;

        if (address === '') {
            setError(true);
            setErrorMsg('Bạn chưa điền địa chỉ nhận hàng');
            return;
        }

        if (name === '') {
            setError(true);
            setErrorMsg('Bạn chưa điền tên người nhận');
            return;
        }

        if (sdt === '') {
            setError(true);
            setErrorMsg('Bạn chưa điền số điện thoại người nhận');
            return;
        }

        if (!/^[0-9]+$/.test(sdt)) {
            setError(true);
            setErrorMsg('Số điện thoại của bạn không hợp lệ');
            return;
        }

        // Map Vietnamese payment method to backend enum value
        const paymentMethodType = paymentMethod === 'Thanh toán khi nhận hàng' ? 'CASH' : 'VNPAY';

        // Prepare the request payload
        const orderData = {
            paymentMethodType: paymentMethodType, // Correct enum value (CASH or VNPAY)
            ipAdress: "1.8.9.0", // You may want to get this dynamically
            note: note,
            shippingInfo: {
                name: name,
                phone: sdt,
                address: address
            }
        };

        // Make the POST request to create the order
        request("POST", "/client-api/orders", orderData)
            .then((response) => {
                setSuccess(true);
                setError(false);
                console.log("Order placed successfully", response.data);
            })
            .catch((error) => {
                setError(true);
                setErrorMsg('Đặt hàng thất bại. Vui lòng thử lại');
                console.error("Error placing order", error);
            });
    };

    const clickOnItem = (id) => {
        router.push(`/products/${id}`);
    }

    return (
        <div className='container'>
            <Link href='/'>
                <button className='back-to-home'>
                    Quay về trang chủ
                </button>
            </Link>

            <div className="payment-page">
                <h1>Thanh toán</h1>
                <div className="product-info">
                    <h2>Thông tin sản phẩm</h2>
                    {cartItems.map((item) => (
                        <div key={item.cartItemVariant.variantId} className="product-item">
                            <div
                                className="product-item-img"
                                style={{backgroundImage: `url(${item.cartItemVariant.productThumbnail})`}}
                                onClick={() => clickOnItem(item.cartItemVariant.productId)}
                            />
                            <div className="product-details">
                                <p
                                    className='product-item-name'
                                    onClick={() => clickOnItem(item.cartItemVariant.productId)}
                                >
                                    <strong>{item.cartItemVariant.productName}</strong>
                                </p>
                                <p>{'Số lượng: ' + item.cartItemQuantity}</p>
                                {item.cartItemVariant.variantProperties && (
                                    <p>{Object.entries(item.cartItemVariant.variantProperties).map(([key, value]) => (
                                        <span key={key}>{key}: {value}</span>
                                    ))}</p>
                                )}
                            </div>
                            <div className="product-pricing">
                                <p className="original-price">{item.cartItemVariant.variantPrice.toLocaleString()}đ</p>
                                <p className="discounted-price">{item.cartItemVariant.variantPrice.toLocaleString()}đ</p>
                            </div>
                            <button onClick={() => handleRemoveItem(item.cartItemVariant.variantId)}
                                    className="remove-btn">
                                Xóa
                            </button>
                        </div>
                    ))}
                </div>

                <div className='transfer-to'>
                    <h2>Chọn nơi giao hàng</h2>
                    <input
                        type='text'
                        value={address}
                        className='transfer-to-input'
                        placeholder='Địa chỉ của bạn'
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <h2>Chọn phương thức thanh toán</h2>
                    <div className='payment-method'>
                        <label className='pame'>
                            <input
                                type='radio'
                                name='payment'
                                value='Thanh toán khi nhận hàng'
                                checked={paymentMethod === 'Thanh toán khi nhận hàng'}
                                className='payment-radio'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="radio-custom"></span>
                            <span className='payment-method-type'>Thanh toán khi nhận hàng</span>
                        </label>
                        <label className='pame'>
                            <input
                                type='radio'
                                name='payment'
                                value='Thanh toán qua VNPay'
                                checked={paymentMethod === 'Thanh toán qua VNPay'}
                                className='payment-radio'
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="radio-custom"></span>
                            <span className='payment-method-type'>Thanh toán qua VNPay</span>
                        </label>
                    </div>
                    <div className='payment-user-info'>
                        <div className='payment-user-box input-separate'>
                            <h2>Tên người nhận</h2>
                            <input
                                type='text'
                                value={name}
                                className='payment-user-input'
                                placeholder='Tên của bạn'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='payment-user-box'>
                            <h2>Sđt người nhận</h2>
                            <input
                                type='text'
                                value={sdt}
                                className='payment-user-input'
                                placeholder='Số điện thoại của bạn'
                                onChange={(e) => setSdt(e.target.value)}
                            />
                        </div>
                    </div>
                    <h2>Ghi chú cho người giao hàng</h2>
                    <input
                        type='text'
                        value={note}
                        className='transfer-to-input'
                        placeholder='Ghi chú của bạn'
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <div className="order-summary">
                    <h2>Đơn hàng</h2>
                    <div className="order-item">
                        <span>Tạm tính</span>
                        <span>{subtotal.toLocaleString()}đ</span>
                    </div>
                    <div className="order-item">
                        <span>Phí vận chuyển</span>
                        <span>{shippingFee.toLocaleString()}đ</span>
                    </div>
                    <div className="order-total">
                        <span>Tổng tiền</span>
                        <span className="total">{total.toLocaleString()}đ</span>
                    </div>
                    {
                        error &&
                        <div className='error-message-container'>
                            <div className='error-message'>
                                {errorMsg}
                            </div>
                        </div>
                    }
                    <button className="place-order-btn"
                            onClick={clickOnOrder}>{(success) ? 'Thành công' : 'Đặt hàng'}</button>
                </div>
            </div>
        </div>
    );
}
