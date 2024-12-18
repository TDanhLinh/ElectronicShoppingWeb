// Hiển thị ra 10 sản phẩm
import Link from 'next/link';

export function Home_product({products}) {
    return (
        <div className="home-product">
            <div className="row sm-gutter">
                {
                    products.length > 0 &&
                    products.map((item, index) => (
                        <div className="col l-2-4 m-4 c-6" key={index}>
                            <Link className="home-product-item" href={`/products/${item.id}`}>
                                <div className="home-product-item__img" style={{backgroundImage: `url(${item.src})`}}></div>
                                <h4 className="home-product-item__name">{item.name}</h4>
                                <div className="home-product-item__price">
                                    <span className="home-product-item__price-old">{item.originalPrice.toLocaleString()}đ</span>
                                    <span className="home-product-item__price-current">{item.discountedPrice.toLocaleString()}đ</span>
                                </div>
                                <div className="home-product-item__rating">
                                    {

                                        [...Array(Math.round(item.star))].map((_, nindex) => (
                                            <i className="home-product-item__rating--gold fas fa-star" key={nindex} />
                                        ))
                                    }
                                    {
                                        [...Array(5-Math.round(item.star))].map((_, nindex) => (
                                            <i className="fas fa-star" key={nindex} />
                                        ))
                                    }
                                </div>
                                <div className="home-product-item__sold">{item.sold} đã bán</div>
                                <div className="home-product-item__origin">
                                    <span className="home-product-item__brand">{item.brand}</span>
                                    <span className="home-product-item__origin-name">{item.origin}</span>
                                </div>
                                <div className="home-product-item__sale-off">
                                    <span className="home-product-item__sale-off-percent">{100-(item.discountedPrice * 100 / item.originalPrice).toFixed()}%</span>
                                    <span className="home-product-item__sale-off-label">GIẢM</span>
                                </div>
                            </Link>
                        </div>
                    ))
                }
                {
                    products.length == 0 &&
                    <img src = './assets/img/noproduct.png' className="noProduct"/>
                }
            </div>
        </div>
    )
}