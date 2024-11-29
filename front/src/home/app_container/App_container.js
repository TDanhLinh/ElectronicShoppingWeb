import { Category } from "./Category";
import { Home_filter } from "./Home_filter";
import { Home_product } from "./Home_product"; 
import { Pagination } from "./Pagination";
import { useState, useEffect } from 'react';
import { sampleProducts } from "./SampleProducts";

// Lấy ra tất cả sản phẩm từ database, hiện tại chưa có axios
export function App_container({searchText, setSearchText}) {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [filter, setFilter] = useState("");
    const [products, setProducts] = useState([]); // toàn bộ tất cả sản phẩm
    const [filteredProducts, setFilteredProducts] = useState([]); // các sản phẩm được lọc dựa trên searchText và filter
    const [viewProducts, setViewProducts] = useState([]); // lọc tiếp 10 sản phẩm dựa trên page
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        // lấy ra tất cả sản phẩm từ database, hiện tại chưa có axios
        
        setProducts(sampleProducts); // sampleProducts nằm trong file SampleProducts.js
        
        const tempProducts = sampleProducts // lọc sản phẩm
            .filter(item => {
                if (searchText === '') return true;
                let i = 0;
                for (let c of item.name.toLowerCase()) {
                    while (i < searchText.length && searchText[i] === ' ') i++;
                    if (i < searchText.length && searchText[i] === c) i++;
                    if (i >= searchText.length) return true;
                }
                return false;
            })
            .sort((a, b) => {
                if (filter === "Phổ biến") return (b.sold - a.sold);
                if (filter === "Mới nhất") {
                    const [dayA, monthA, yearA] = a.time.split('/').map(Number);
                    const [dayB, monthB, yearB] = b.time.split('/').map(Number);
                    const dateA = new Date(yearA, monthA - 1, dayA);
                    const dateB = new Date(yearB, monthB - 1, dayB);
                    return dateB - dateA;
                }
                if (filter === "Bán chạy") return (b.sold - a.sold);
                if (filter === "Giá: thấp đến cao") return (a.discountedPrice - b.discountedPrice);
                if (filter === "Giá: cao đến thấp") return (b.discountedPrice - a.discountedPrice);
                return (a.id - b.id);
            })

        setFilteredProducts(tempProducts);
        const curMaxPage = Math.ceil(tempProducts.length / 10);
        setMaxPage(curMaxPage);
        setViewProducts(tempProducts.slice((page - 1) * 10, Math.min(page * 10 - 1, tempProducts.length - 1) + 1));

    }, [])

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        const tempProducts = products
            .filter(item => {
                if (searchText === '') return true;
                let i = 0;
                for (let c of item.name.toLowerCase()) {
                    while (i < searchText.length && searchText[i] === ' ') i++;
                    if (i < searchText.length && searchText[i] === c) i++;
                    if (i >= searchText.length) return true;
                }
                return false;
            })
            .sort((a, b) => {
                if (filter === "Phổ biến") return (b.sold - a.sold);
                if (filter === "Mới nhất") {
                    const [dayA, monthA, yearA] = a.time.split('/').map(Number);
                    const [dayB, monthB, yearB] = b.time.split('/').map(Number);
                    const dateA = new Date(yearA, monthA - 1, dayA);
                    const dateB = new Date(yearB, monthB - 1, dayB);
                    return dateB - dateA;
                }
                if (filter === "Bán chạy") return (b.sold - a.sold);
                if (filter === "Giá: thấp đến cao") return (a.discountedPrice - b.discountedPrice);
                if (filter === "Giá: cao đến thấp") return (b.discountedPrice - a.discountedPrice);
                return (a.id - b.id);
            })
        
        setFilteredProducts(tempProducts);
        const curMaxPage = Math.ceil(tempProducts.length / 10);
        setMaxPage(curMaxPage);
        setViewProducts(tempProducts.slice((page - 1) * 10, Math.min(page * 10 - 1, tempProducts.length - 1) + 1));
    }, [searchText, filter])

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        
        setViewProducts(filteredProducts.slice((page - 1) * 10, Math.min(page * 10 - 1, filteredProducts.length - 1) + 1))
    }, [page])
    
    return (
        <div className="app__container">
            <div className="grid wide">
                <div className=" row sm-gutter app__content">
                    <div className="col l-2 m-0 c-0">
                        <Category
                            searchText = {searchText}
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
                            products={viewProducts}
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