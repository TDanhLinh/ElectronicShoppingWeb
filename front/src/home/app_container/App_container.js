import { Category } from "./Category";
import { Home_filter } from "./Home_filter";
import { Home_product } from "./Home_product"; 
import { Pagination } from "./Pagination";
import { useState, useEffect } from 'react';

// Lấy ra tất cả sản phẩm từ database, hiện tại chưa có axios
export function App_container({searchText, setSearchText}) {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // lấy ra tất cả sản phẩm từ database, hiện tại chưa có axios
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
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
                description: 'Lorem Ipsum est un texte d’espace réservé couramment utilisé dans les industries graphique, imprimée et éditoriale pour prévisualiser les mises en page et les maquettes visuelles.',
            },
        ]
        setProducts(sampleProducts);
    }, [searchText, page, filter])
    
    return (
        <div className="app__container">
            <div className="grid wide">
                <div className=" row sm-gutter app__content">
                    <div className="col l-2 m-0 c-0">
                        <Category
                            setSearchText = {setSearchText}
                        />
                    </div>
                    <div className="col l-10 m-12 c-12">
                        <Home_filter
                            page={page}
                            setPage={setPage}
                            maxPage={maxPage}
                            setFilter={setFilter}
                        />
                        <Home_product
                            products={products}
                        />
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