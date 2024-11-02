import { useEffect, useState } from 'react'

export function Home_product() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsList = localStorage.getItem('products');
        if (productsList) {
            setProducts(JSON.parse(productsList));
        }
        else {
            const sampleProducts = [
                {
                    id: 1,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1600498324-myphamohui-lgvina.png',
                    name: 'Son Whoo Luxury Lip Rouge mini',
                    originalPrice: 550000,
                    discountedPrice: 450000,
                    shippingFee: 25000,
                    sold: 88,
                    brand: 'Whoo',
                    origin: 'Hàn Quốc',
                    liked: true,
                },
                {
                    id: 2,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1597318354-myphamohui-lgvina.png',
                    name: 'Set kem chống nắng Whoo Seol radiant white tone up sunscreen SPF50PA 50ms',
                    originalPrice: 1250000,
                    discountedPrice: 1125000,
                    shippingFee: 25000,
                    sold: 20,
                    brand: 'MB Bank',
                    origin: 'Việt Nam',
                    liked: false,
                },
                {
                    id: 3,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1596624550-myphamohui-lgvina.png',
                    name: 'Sửa rửa mặt dưỡng trắng Whoo Seol Brightening Foam cleanser set 220ml',
                    originalPrice: 910000,
                    discountedPrice: 819000,
                    shippingFee: 25000,
                    sold: 156,
                    brand: 'ooo',
                    origin: 'Trung Quốc',
                    liked: true,
                },
                {
                    id: 4,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1596535100-myphamohui-lgvina.png',
                    name: 'Set son Whoo Luxury Lip Rouge màu mới tinh #88 hồng đỏ đất',
                    originalPrice: 1050000,
                    discountedPrice: 945000,
                    shippingFee: 25000,
                    sold: 38,
                    brand: 'pp',
                    origin: 'Lào',
                    liked: true,
                },
                {
                    id: 5,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1596528994-myphamohui-lgvina.png',
                    name: 'Set son Whoo Velvet Lip Rouge dòng hoàng cung màu đỏ cam',
                    originalPrice: 1050000,
                    discountedPrice: 945000,
                    shippingFee: 25000,
                    sold: 88,
                    brand: 'pp',
                    origin: 'Lào',
                    liked: true,
                },
                {
                    id: 6,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1591788607-myphamohui-lgvina.png',
                    name: 'Set dưỡng ấm Whoo hồng Gongjinhyang Soo Vital Hydrating 2pcs spcecail set',
                    originalPrice: 2600000,
                    discountedPrice: 2340000,
                    shippingFee: 25000,
                    sold: 88,
                    brand: 'pp',
                    origin: 'Lào',
                    liked: false,
                },
                {
                    id: 7,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1591784476-myphamohui-lgvina.png',
                    name: 'Set dưỡng ấm Whoo hồng Gongjinhyang Soo Vital Hydrating spcecail set',
                    originalPrice: 3100000,
                    discountedPrice: 2790000,
                    shippingFee: 25000,
                    sold: 88,
                    brand: 'pp',
                    origin: 'Lào',
                    liked: true,
                },
                {
                    id: 8,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1591783524-myphamohui-lgvina.png',
                    name: 'Tẩy trang Whoo Vital Hydrating',
                    originalPrice: 950000,
                    discountedPrice: 855000,
                    shippingFee: 25000,
                    sold: 100,
                    brand: 'pp',
                    origin: 'Lào',
                    liked: true,
                },
                {
                    id: 9,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1591780389-myphamohui-lgvina.png',
                    name: 'Mặt nạ ngủ cấp nước Whoo Hydrating',
                    originalPrice: 1200000,
                    discountedPrice: 1080000,
                    shippingFee: 25000,
                    sold: 60,
                    brand: 'pp',
                    origin: 'Lào',
                    liked: true,
                },
                {
                    id: 10,
                    src: 'https://img.abaha.vn/photos/resized/320x/83-1591778831-myphamohui-lgvina.png',
                    name: 'Kem dưỡng Whoo Gongjinhyang Soo Super Hydrating',
                    originalPrice: 2600000,
                    discountedPrice: 2340000,
                    shippingFee: 25000,
                    sold: 88,
                    brand: 'pp',
                    origin: 'Lào',
                    liked: true,
                },
            ];

            setProducts(sampleProducts);
            localStorage.setItem('products', JSON.stringify(sampleProducts));
        }
    }, [])

    return (
        <div className="home-product">
            <div className="row sm-gutter">
                {
                    products.map((item, index) => (
                        <div key={index} className="col l-2-4 m-4 c-6">
                            <a href="" className="home-product-item">
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
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}