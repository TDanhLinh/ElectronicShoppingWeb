import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sampleProducts } from './SampleProducts';
import { sampleUser } from './SampleUser';
import { useRouter } from 'next/router';

export function Payment() {
    // Nếu chưa đăng nhập, chuyển sang trang đăng nhập
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user || user.length === 0) router.push('/login');
    }, [])
    
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

    // Lấy thông tin giỏ hàng từ database, đang thiếu axios
    useEffect(() => {
        
        setCartItems(sampleProducts);

        setUser(sampleUser);
        setName(sampleUser.name);
        setAddress(sampleUser.address);
        if (user.sdt) setSdt(user.std);
    }, []);

    // Cập nhật khi giỏ hàng thay đổi, thiếu axios
    const updateLocalStorage = (items) => {
        localStorage.setItem("cartItems", JSON.stringify(items));
    };

    // Hàm xử lý xóa sản phẩm
    const handleRemoveItem = (itemId) => {
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedItems);
        updateLocalStorage(updatedItems);
    };

    // Tính toán tổng cộng
    const subtotal = cartItems.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);
    const shippingFee = cartItems.reduce((acc, item) => acc + item.shippingFee, 0);
    const total = subtotal + shippingFee;

    // xóa tất cả sản phẩm ra khỏi giỏ hàng
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

        setSuccess(true);
        setError(false);
    }

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
                        <div key={item.id} className="product-item">
                            <div 
                                className="product-item-img" style={{backgroundImage: `url(${item.src})`}}
                                onClick={() => clickOnItem(item.id)}
                            />
                            <div className="product-details">
                                <p 
                                    className='product-item-name'
                                    onClick={() => clickOnItem(item.id)}
                                >
                                    <strong>{item.name}</strong>
                                </p>
                                <p>{'Số lượng: ' + item.quantity}</p>
                            </div>
                            <div className="product-pricing">
                                <p className="original-price">{item.originalPrice.toLocaleString()}đ</p>
                                <p className="discounted-price">{item.discountedPrice.toLocaleString()}đ</p>
                            </div>
                            <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">
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
                    <button className="place-order-btn" onClick={clickOnOrder}>{(success) ? 'Thành công' : 'Đặt hàng'}</button>
                </div>
            </div>
        </div>
    );
}
