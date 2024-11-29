import { useState, useEffect } from 'react';
import { sampleProducts } from './SampleProducts';
import { Pagination } from './Pagination';
import Link from 'next/link';

export function CommentProduct() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [star, setStar] = useState([]);
    const [success, setSuccess] = useState([]);
    const [writeComment, setWriteComment] = useState(-1); // kiểm tra xem đang viết bình luận cho sản phẩm thứ mấy
    const [comment, setComment] = useState([]); // lưu các bình luận đang viết

    useEffect(() => {
        // lấy sản phẩm chưa đánh giá từ database, hiện tại chưa có axios
        setProducts(sampleProducts);
        setMaxPage(Math.ceil(sampleProducts.length / 5));
        setStar(Array(sampleProducts.length).fill(5));
        setSuccess(Array(sampleProducts.length).fill(false))
        setComment(Array(sampleProducts.length).fill(''))
    }, [])

    // Ấn vô nút đánh giá, đẩy cmt và số sao lên database và xóa bài viết chưa được đánh giá khỏi database
    const clickOnJudge = (id, index) => { // Cần xóa sản phẩm có số hiệu là id ra khỏi database, xóa khỏi phần chưa đánh giá
        if (success[index]) return;

        const newSuccess = [...success];
        newSuccess[index] = true;
        setSuccess(newSuccess);
    }

    const changeComment = (e, index) => {
        const newComment = [...comment];
        newComment[index] = e.target.value;
        setComment(newComment);
    }
    
    return (
        <div className="user-information">
            <div className="user-information-header">Đánh giá sản phẩm</div>
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
                                                <div className='cmt-price-product'>{item.price.toLocaleString()}đ</div>
                                            </div>
                                        </div>
                                        <div className='comment-stars'>
                                            {
                                                [...Array(Math.round(star[Math.round(index + (page - 1) * 5)]))].map((_, nindex) => (
                                                    <i  
                                                        className="home-product-item__rating--gold fas fa-star comment-star" 
                                                        key={nindex}
                                                        onClick={() => {
                                                            const newStar = [...star];
                                                            newStar[Math.round(index + (page - 1) * 5)] = Math.round(nindex + 1);
                                                            setStar(newStar);
                                                        }}
                                                    />
                                                ))
                                            }
                                            {
                                                [...Array(5-Math.round(star[Math.round(index + (page - 1) * 5)]))].map((_, nindex) => (
                                                    <i 
                                                        className="fas fa-star comment-star no-star" 
                                                        key={nindex}
                                                        onClick={() => {
                                                            const newStar = [...star];
                                                            newStar[Math.round(index + (page - 1) * 5)] = Math.round(star[Math.round(index + (page - 1) * 5)] + nindex + 1);
                                                            setStar(newStar);
                                                        }}
                                                    />
                                                ))
                                            }
                                        </div>
                                        <button className='write-comment' onClick={() => setWriteComment(Math.round(index + (page - 1) * 5))}>Viết bình luận</button>
                                        <button className='buy-again-btn' onClick={() => clickOnJudge(item.id, Math.round(index + (page - 1) * 5))}>{(success[Math.round(index + (page - 1) * 5)]) ? 'Thành công' : 'Đánh giá'}</button>
                                    </div>
                                ))
                            }
                        </div>
                    }
                    {
                        writeComment > -1 &&
                        <div className='overlay' onClick={() => setWriteComment(-1)}>
                            <div className='write-comment-container' onClick={(e) => e.stopPropagation()}>
                                <textarea
                                    type='text'
                                    className='write-comment-input'
                                    value={comment[writeComment]}
                                    placeholder={'Viết bình luận của bạn cho sản phẩm: ' + products[writeComment].name}
                                    onChange={(e) => changeComment(e, writeComment)}
                                />
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