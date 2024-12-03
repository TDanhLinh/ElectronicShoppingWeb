import {useState, useEffect} from 'react';
import {Detail} from "../../../../product-id/app_container/Detail";
import {Comments} from "../../../../product-id/app_container/Comments";
import {Image} from "../../../../product-id/app_container/Image";
import {request} from "../../../../api/axios";

export function ShowProduct(props) {
    const {id} = props;
    const [product, setProduct] = useState({
        name: "",
        slug: "",
        description: "",
        thumbnail: "",
        status: "",
        unit: "",
        brandId: "",
        weight: "",
        specification: {},
        warrantyDuration: "",
        categoryIds: {},
        images: {},
        variants: {},
    });
    const [type, setType] = useState(0); // 1 sản phẩm có nhiều ảnh, type để xem người dùng đang tập trung vào ảnh nào

    useEffect(() => {
        request("GET", `/api/products/${id}`).then((response) => {
            setProduct(response.data.payload);
        })
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