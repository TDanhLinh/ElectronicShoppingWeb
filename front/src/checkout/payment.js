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

    // Lấy thông tin giỏ hàng từ database, đang thiếu axios
    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
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

    // Hàm xử lý thay đổi số lượng sản phẩm
    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedItems = cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
        updateLocalStorage(updatedItems);
    };

    // Tính toán tổng cộng
    const subtotal = cartItems.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);
    const shippingFee = cartItems.reduce((acc, item) => acc + item.shippingFee, 0);
    const total = subtotal + shippingFee;

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
                                <p>Số lượng: 
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                    />
                                </p>
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
                    <button className="place-order-btn">Đặt hàng</button>
                </div>
            </div>
        </div>
    );
}
