import { useState, useEffect } from 'react';

export function Comments({product}) {
    return (
        product.url &&
        <div className='product-container' style={{flexDirection:'column'}}>
            <div className='comment-describe'>BÌNH LUẬN</div>
            {
                product.cmt.map((item, index) => (
                    <div className='user-comment'>
                        <div className='comment'>
                            <div className='comment-user-img' style={{backgroundImage: `url(${item.user.src})`}}/>
                            <div className='comment-rest'>
                                <div className='comment-user-name'>{item.user.nickname || item.user.name}</div>
                                <div className='comment-user-star'>
                                    {
                                        
                                        [...Array(Math.round(item.star))].map((_, nindex) => (
                                            <i className="home-product-item__rating--gold fas fa-star red" key={nindex} style={{fontSize: '12px'}}/>
                                        ))
                                    }
                                    {
                                        [...Array(5-Math.round(item.star))].map((_, nindex) => (
                                            <i className="fas fa-star not-red" key={nindex} style={{fontSize: '12px'}}/>
                                        ))
                                    }
                                </div>
                                <div className='comment-user-time'>{item.time}</div>
                                <div className='comment-user-content'>{item.content}</div>
                            </div>
                        </div>
                        <div className='cmt-separate'/>
                    </div>
                ))
            }
        </div>
    )
}