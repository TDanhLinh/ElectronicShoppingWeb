import { useState, useEffect } from 'react';
import { sampleProducts } from './SampleProducts';
import { Pagination } from './Pagination';
import Link from 'next/link';

export function BoughtProducts() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    useEffect(() => {
        // lấy sản phẩm đã mua từ database, hiện tại chưa có axios
        setProducts(sampleProducts);
        setMaxPage(Math.ceil(sampleProducts.length / 5));
    }, [])

    return (
        <div className="user-information">
            <div className="user-information-header">Sản phẩm đã mua</div>
            <div className="user-information-container">
                <div className='bought-products-container'>
                    {
                        products.length > 0 &&
                        <div className='all-products'>
                            {
                                products.slice((page - 1) * 5, Math.min(page * 5, products.length)).map((item, index) => (
                                    <div className='product-container' key={index}>
                                        <div className='product-info'>
                                            <div className="product-img" style={{backgroundImage: `url(${item.src})`}}></div>
                                            <div className='name-type-amount'>
                                                <div className='name-product'>{item.name}</div>
                                                <div className='type-product'>Phân loại hàng: {item.type}</div>
                                                <div className='amount-product'>Số lượng: {item.amount}</div>
                                            </div>
                                        </div>
                                        <div className='price-product'>{item.price.toLocaleString()}đ</div>
                                        <Link href={`../products/${item.id}`}>
                                            <button className='buy-again-btn'>Mua lại</button>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    <div className='pagination-container'>
                        <Pagination
                            page={page}
                            setPage={setPage}
                            maxPage={maxPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}