import { useEffect, useState } from 'react';

export function Product({item}) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll');
        }
    
        return () => document.body.classList.remove('no-scroll');
    }, [isOpen]);
    
    return (
        <div className="col l-2-4 m-4 c-6">
            <div className="home-product-item" onClick={() => setIsOpen(true)}>
                <div className="home-product-item__img" style={{backgroundImage: `url(${item.src})`}}></div>
                <h4 className="home-product-item__name">{item.name}</h4>
                <div className="home-product-item__price">
                    <span className="home-product-item__price-old">{item.originalPrice.toLocaleString()}đ</span>
                    <span className="home-product-item__price-current">{item.discountedPrice.toLocaleString()}đ</span>
                </div>
                <div className="home-product-item__action">
                    <span className={"home-product-item__like" + ((item.liked) ? " home-product-item__like--liked" : "")}>
                        <i className="home-product-item__like-icon-default far fa-heart"></i>
                        <i className="home-product-item__like-icon-liked fas fa-heart"></i>
                    </span>
                    <div className="home-product-item__rating">
                        <i className="home-product-item__rating--gold fas fa-star"></i>
                        <i className="home-product-item__rating--gold fas fa-star"></i>
                        <i className="home-product-item__rating--gold fas fa-star"></i>
                        <i className="home-product-item__rating--gold fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <span className="home-product-item__sold">{item.sold} đã bán</span>
                    </div>
                </div>
                <div className="home-product-item__origin">
                    <span className="home-product-item__brand">{item.brand}</span>
                    <span className="home-product-item__origin-name">{item.origin}</span>
                </div>
                {
                    item.liked &&
                    <div className="home-product-item__favorite">
                        <i className="fas fa-check"></i>
                        <span className="">Yêu thích</span>
                    </div>
                }
                <div className="home-product-item__sale-off">
                    <span className="home-product-item__sale-off-percent">{100-(item.discountedPrice * 100 / item.originalPrice).toFixed(0)}%</span>
                    <span className="home-product-item__sale-off-label">GIẢM</span>
                </div>
            </div>
            {
                isOpen &&
                <div className='overlay' onClick={() => setIsOpen(false)}>
                    <div className='home-product-item__content' onClick={(e) => e.stopPropagation()}>
                        <div className='home-product-item__content-container'>
                            <img src={item.src} className='home-product-item__content-img' />
                            <div className='home-product-item__content-description'>
                                <h1 className='home-product-item__content-name'>{item.name}</h1>
                                <div className="home-product-item__content-rating">
                                    <div className='home-product-item__content-star'>
                                        <i className="home-product-item__rating--gold fas fa-star"></i>
                                        <i className="home-product-item__rating--gold fas fa-star"></i>
                                        <i className="home-product-item__rating--gold fas fa-star"></i>
                                        <i className="home-product-item__rating--gold fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <span className="home-product-item__sold">{item.sold} đã bán</span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}