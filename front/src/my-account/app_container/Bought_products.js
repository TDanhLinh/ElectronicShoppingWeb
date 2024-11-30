import { useState, useEffect } from 'react';
import { sampleProducts } from './SampleProducts';
import { Pagination } from './Pagination';
import Link from 'next/link';

export function BoughtProducts() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [star, setStar] = useState([]);
    const [success, setSuccess] = useState([]);
    const [writeComment, setWriteComment] = useState(-1); // kiểm tra xem đang viết bình luận cho sản phẩm thứ mấy
    const [comment, setComment] = useState([]);

    useEffect(() => {
        // lấy sản phẩm đã mua từ database, hiện tại chưa có axios
        setProducts(sampleProducts);
        setMaxPage(Math.ceil(sampleProducts.length / 5));
        setStar(Array(sampleProducts.length).fill(5));
        setSuccess(Array(sampleProducts.length).fill(false))
        setComment(Array(sampleProducts.length).fill(''))
    }, [])

    const changeComment = (e, index) => {
        const newComment = [...comment];
        newComment[index] = e.target.value;
        setComment(newComment);
    }

    // Đẩy bình luận lên database, hiện chưa có axios
    const clickOnJudge = (id, index) => { // Thêm comment, star vào sản phẩm id
        if (success[index]) return;

        const newSuccess = [...success];
        newSuccess[index] = true;
        setSuccess(newSuccess);
    }

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
                                            <Link href={`../products/${item.id}`} className="product-img" style={{backgroundImage: `url(${item.src})`}} />
                                            <div className='name-type-amount'>
                                                <Link href={`../products/${item.id}`} className='name-product'>{(item.name.length > 18) ? (item.name.substring(0,18) + '...') : item.name}</Link>
                                                <div className='type-product'>Phân loại hàng: {item.type}</div>
                                                <div className='amount-product'>Số lượng: {item.amount}</div>
                                            </div>
                                        </div>
                                        <div className='price-product'>{item.price.toLocaleString()}đ</div>
                                        <div className='all-btn'>
                                            <button className='write-comment' onClick={() => setWriteComment(Math.round(index + (page - 1) * 5))}>Viết đánh giá</button>
                                            <Link href={`../products/${item.id}`}>
                                                <button className='buy-again-btn'>Mua lại</button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    {
                        writeComment > -1 &&
                        <div className='overlay' onClick={() => setWriteComment(-1)}>
                            <div className='write-comment-container' onClick={(e) => e.stopPropagation()}>
                                <div className='comment-stars'>
                                    <div className='comment-stars-p'>{`Đánh giá ${star[writeComment]} sao: `}</div>
                                    {
                                        [...Array(star[writeComment])].map((_, nindex) => (
                                            <i  
                                                className="home-product-item__rating--gold fas fa-star comment-star" 
                                                key={nindex}
                                                onClick={() => {
                                                    const newStar = [...star];
                                                    newStar[writeComment] = Math.round(nindex + 1);
                                                    setStar(newStar);
                                                }}
                                            />
                                        ))
                                    }
                                    {
                                        [...Array(5-star[writeComment])].map((_, nindex) => (
                                            <i 
                                                className="fas fa-star comment-star no-star" 
                                                key={nindex}
                                                onClick={() => {
                                                    const newStar = [...star];
                                                    newStar[writeComment] = Math.round(star[writeComment] + nindex + 1);
                                                    setStar(newStar);
                                                }}
                                            />
                                        ))
                                    }
                                </div>
                                <textarea
                                    type='text'
                                    className='write-comment-input'
                                    value={comment[writeComment]}
                                    placeholder={'Viết bình luận của bạn cho sản phẩm: ' + products[writeComment].name}
                                    onChange={(e) => changeComment(e, writeComment)}
                                />
                                <button 
                                    className='buy-again-btn' 
                                    onClick={() => clickOnJudge(products[writeComment].id, writeComment)}
                                    style={{width:'300px'}}
                                >
                                    {(success[writeComment]) ? 'Thành công' : 'Viết bình luận'}
                                </button>
                            </div>
                        </div>
                    }
                    {
                        products.length === 0 &&
                        <div className='no-item'>
                            <img src='../assets/img/noCart.png' className='no-item-img'/>
                            <div className='no-item-p'>Chưa có sản phẩm</div>
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