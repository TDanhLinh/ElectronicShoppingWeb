import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Detail({product, type, setType}) {
    const [amount, setAmount] = useState(1);
    const [success, setSuccess] = useState(false);

    const onInputChange = (e, maxAmount) => {
        if (e.target.value === '') setAmount(1);
        else setAmount(Math.min(Number(e.target.value), maxAmount));
    }

    const addToCart = () => {
        if (success) return;

        setSuccess(true);
        // Thực hiện theo vào cart trong database
    }
    
    return (
        product.url &&
        <div className='product--detail'>
            <div className='product--name'>{product.name}</div>
            <div className='product--rating'>
                <div className='product--star-rate'>
                    <div className='product--star-rate-number'>{product.star}</div>
                    {
                                        
                        [...Array(Math.round(product.star))].map((_, nindex) => (
                            <i className="home-product-item__rating--gold fas fa-star" key={nindex} style={{fontSize: '12px'}}/>
                        ))
                    }
                    {
                        [...Array(5-Math.round(product.star))].map((_, nindex) => (
                            <i className="fas fa-star" key={nindex} style={{fontSize: '12px'}}/>
                        ))
                    }
                </div>
                <div className='separate-rate'/>
                <div className='product--total-judge'>
                    <div className='product--star-rate-number'>{product.amountRate}</div>
                    <div className='product--total-judge-describe'>Đánh giá</div>
                </div>
                <div className='separate-rate'/>
                <div className='product--total-judge'>
                    <div className='product--amount-sold'>{product.sold}</div>
                    <div className='product--total-judge-describe'>Đã bán</div>
                </div>
            </div>
            <div className='product--price-container'>
                <div className='product--price-discount'>{product.discountedPrice.toLocaleString()}đ</div>
                <div className='product--price-origin'>{product.originalPrice.toLocaleString()}đ</div>
                <div className='product--price-percent'>-{100-(product.discountedPrice * 100 / product.originalPrice).toFixed(0)}%</div>
            </div>
            <div className='product--other-thing' style={{alignItems:"flex-start"}}>
                <div className='product--other-thing-describe'>Mô tả</div>
                <div className='product--other-thing-p'>{product.description}</div>
            </div>
            <div className='product--other-thing'>
                <div className='product--other-thing-describe'>Chính sách Trả hàng</div>
                <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/b69402e4275f823f7d47.svg' className='product--other-thing-return'/>
                <div className='product--other-thing-return-p1'>Trả hàng 15 ngày</div>
                <div className='product--other-thing-return-p2'>Trả hàng miễn phí</div>
            </div>
            <div className='product--other-thing'>
                <div className='product--other-thing-describe'>Deal Sốc</div>
                <div className='product--other-thing-super-deal'>Mua với ưu đãi giảm giá</div>
            </div>
            <div className='product--other-thing' style={{alignItems:"flex-start"}}>
                <div className='product--other-thing-describe'>Phân loại</div>
                <div className='product--other-thing-container'>
                    {
                        product.type.map((item, index) => (
                            <div 
                                key={index} 
                                className={'product--other-thing-type' + ((type===index)? ' chosen-item-type' : '')}
                                onClick={() => setType(index)}
                            >
                                {item}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='product--other-thing'>
                <div className='product--other-thing-describe'>Số lượng</div>
                <input 
                    className='product--other-thing-amount'
                    type='number'
                    value={amount}
                    onChange={(e) => onInputChange(e, product.availableAmount[type])}
                />
                <div className='product--other-thing-available-amount'>{product.availableAmount[type]} sản phẩm có sẵn</div>
            </div>
            <div className='product--button'>
                <div className='product--add-to-cart' onClick={addToCart}>
                    {
                        !success && 
                        <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/0f3bf6e431b6694a9aac.svg' className='product--add-to-cart-img'/>
                    }
                    {
                        !success &&
                        <div className='product--add-to-cart-p'>Thêm vào giỏ hàng</div>
                    }
                    {
                        success && 
                        <div className='product--add-to-cart-p'>Thành công</div>
                    }
                </div>
                <Link className='product--go-to-cart' href='../../payment'>Đi tới giỏ hàng</Link>
            </div>
        </div>
    )
}