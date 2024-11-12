import { useEffect, useState } from 'react';
import Link from 'next/link';

export function Product({item}) {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const [done, setDone] = useState(false);

    useEffect(() => {
        const account = localStorage.getItem('user');
        setUser(JSON.parse(localStorage.getItem(account)));
    }, [])

    const close = () => {
        setDone(false);
        setIsOpen(false);
    }

    const buy = () => {
        setDone(true);
    }
    
    return (
        <div className="col l-2-4 m-4 c-6">
            <div className="home-product-item" onClick={() => setIsOpen(true)}>
                <div className="home-product-item__img" style={{backgroundImage: `url(${item.src})`}}></div>
                <h4 className="home-product-item__name">{item.name}</h4>
                <div className="home-product-item__price">
                    <span className="home-product-item__price-old">{item.originalPrice.toLocaleString()}đ</span>
                    <span className="home-product-item__price-current">{item.discountedPrice.toLocaleString()}đ</span>
                </div>
                <div className="home-product-item__rating">
                    <i className="home-product-item__rating--gold fas fa-star" />
                    <i className="home-product-item__rating--gold fas fa-star" />
                    <i className="home-product-item__rating--gold fas fa-star" />
                    <i className="home-product-item__rating--gold fas fa-star" />
                    <i className="fas fa-star"></i>
                </div>
                <div className="home-product-item__sold">{item.sold} đã bán</div>
                <div className="home-product-item__origin">
                    <span className="home-product-item__brand">{item.brand}</span>
                    <span className="home-product-item__origin-name">{item.origin}</span>
                </div>
                <div className="home-product-item__sale-off">
                    <span className="home-product-item__sale-off-percent">{100-(item.discountedPrice * 100 / item.originalPrice).toFixed(0)}%</span>
                    <span className="home-product-item__sale-off-label">GIẢM</span>
                </div>
            </div>
            {
                isOpen &&
                <div className='overlay' onClick={close}>
                    <div className='home-product-item__content' onClick={(e) => e.stopPropagation()}>
                        <div className='home-product-item__content-container'>
                            <div className='home-product-item__content-img-add-to-cart'>
                                <img src={item.src} className='home-product-item__content-img' />
                                {
                                    !done &&
                                    <button className='home-product-item__content-button' onClick={buy}>
                                        <i className="home-product-item__content-icon fas fa-cart-plus"></i>
                                        <div>Thêm vào giỏ hàng</div>
                                    </button>
                                }
                                {
                                    done &&
                                    <div className='home-product-item__content-check'>
                                        <button className='home-product-item__content-button'>
                                            <i className="home-product-item__content-icon fas fa-check"></i>
                                        </button>
                                        <Link href='/payment' className='home-product-item__content-button-p'>Đi tới giỏ hàng</Link>
                                    </div>
                                }
                            </div>
                            <div className='home-product-item__content-description'>
                                <div className='home-product-item__content-information'>
                                    <div className="home-product-item__content-brand">Thương hiệu: {item.brand}</div>
                                    <h1 className='home-product-item__content-name'>{item.name}</h1>
                                    <div className="home-product-item__content-rating">
                                        <div className='home-product-item__content-rate'>4.8</div>
                                        <div className='home-product-item__content-star'>
                                            <i className="home-product-item__content-rating--gold fas fa-star"></i>
                                            <i className="home-product-item__content-rating--gold fas fa-star"></i>
                                            <i className="home-product-item__content-rating--gold fas fa-star"></i>
                                            <i className="home-product-item__content-rating--gold fas fa-star"></i>
                                            <i className="home-product-item__content-rating--grey fas fa-star"></i>
                                        </div>
                                        <div className='home-product-item__content-rate-amount'>(12)</div>
                                        <div className='separation'></div>
                                        <div className="home-product-item__content-sold">Đã bán {item.sold}</div>
                                    </div>
                                    <div className="home-product-item__content-origin-name">Made in {item.origin}</div>
                                    <div className='home-product-item__content-price'>
                                        <div className="home-product-item__content-price-current">{item.discountedPrice.toLocaleString()}đ</div>
                                        <div className="home-product-item__content-sale-off-percent">-{100-(item.discountedPrice * 100 / item.originalPrice).toFixed(0)}%</div>
                                        <div className="home-product-item__content-price-old">{item.originalPrice.toLocaleString()}đ</div>
                                    </div>
                                </div>
                                <div className='home-product-item__content-information'>
                                    <div className='home-product-item__content-p1'>Thông tin vận chuyển</div>
                                    <div className='home-product-item__content-p2'>Giao đến {user.address}</div>
                                    <div className='separation-row'></div>
                                    <div className='home-product-item__content-ship'>
                                        <img src='https://salt.tikicdn.com/ts/upload/6b/59/d9/783a8f53f8c251dbe5f644df40c21c15.png' className='home-product-item__content-afternoon-img'/>
                                        <div className='home-product-item__content-p3'>Giao đúng chiều mai</div>
                                    </div>
                                    <div className='home-product-item__content-p2'>13h - 18h, 08/11: 3.300đ</div>
                                    <div className='separation-row'></div>
                                    <div className='home-product-item__content-ship'>
                                        <img src='https://salt.tikicdn.com/ts/upload/67/bc/b6/7aed838df704ad50927e343895885e73.png' className='home-product-item__content-freeship-img'/>
                                        <div className='home-product-item__content-p3'>Freeship 10k đơn từ 45k, Freeship 25k đơn từ 100k</div>
                                    </div>
                                </div>
                                <div className='home-product-item__content-information'>
                                    <div className='home-product-item__content-p1'>Mô tả sản phẩm</div>
                                    <div className='home-product-item__content-p2'>{item.description}</div>
                                    <div className='home-product-item__content-p2'>{item.description}</div>
                                    <div className='home-product-item__content-p2'>{item.description}</div>
                                    <div className='home-product-item__content-p2'>{item.description}</div>
                                    <div className='home-product-item__content-p2'>{item.description}</div>
                                    <div className='home-product-item__content-p2'>{item.description}</div>
                                    <div className='home-product-item__content-p2'>{item.description}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}