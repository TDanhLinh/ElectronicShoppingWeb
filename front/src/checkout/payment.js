import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Payment() {
    // Nếu chưa đăng nhập, chuyển sang trang đăng nhập
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (!user || user.length === 0) window.location.href = '/login';
        }
    }, [])
    
    const [cartItems, setCartItems] = useState([]);
    const [success, setSuccess] = useState(false);
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng');

    // Lấy thông tin giỏ hàng từ database, đang thiếu axios
    useEffect(() => {
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
        setCartItems(sampleItems);

        // Lấy địa chỉ mặc định từ database, hiện tại chưa có axios
        setAddress('Thành phố Ninh Bình, tỉnh Ninh Bình, Việt Nam');
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
        setSuccess(true);
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
                            <div className="product-details">
                                <p><strong>{item.name}</strong></p>
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
                    <button className="place-order-btn" onClick={clickOnOrder}>{(success) ? 'Thành công' : 'Đặt hàng'}</button>
                </div>
            </div>
        </div>
    );
}
