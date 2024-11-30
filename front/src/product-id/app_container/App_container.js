import { useState, useEffect } from 'react';
import { Image } from './Image';
import { sampleProduct } from './SampleProduct';
import { Detail } from './Detail';
import { Comments } from './Comments';

export function App_container({id}) {
    const [product, setProduct] = useState({});
    const [type, setType] = useState(0); // 1 sản phẩm có nhiều ảnh, type để xem người dùng đang tập trung vào ảnh nào

    useEffect(() => {
        // lấy thông tin sản phẩm từ database, hiện tại chưa có axios
        setProduct(sampleProduct);
    }, [])

    return (
        <div className="app__container">
            <div className="grid wide">
                <div className=" row sm-gutter app__content">
                    <div className='product-container'>
                        <Image
                            product = {product}
                            type = {type}
                            setType = {setType}
                        />
                        <Detail
                            product = {product}
                            type = {type}
                            setType = {setType}
                        />
                    </div>
                    <Comments
                        product = {product}
                    />
                </div>
            </div>
        </div>
    )
}