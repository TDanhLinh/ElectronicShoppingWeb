import { Category } from "./Category";
import { Home_filter } from "./Home_filter";
import { Home_product } from "./Home_product";
import { Pagination } from "./Pagination";
import { useState, useEffect } from 'react';
import { request } from "../../api/axios";

export function App_container({ searchText, setSearchText }) {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [filter, setFilter] = useState("");
    const [products, setProducts] = useState([]); // All products
    const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on searchText and filter
    const [viewProducts, setViewProducts] = useState([]); // 10 products per page
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [categorySearchText, setCategorySearchText] = useState(""); // New state for category search

    useEffect(() => {
        // Check if products are already in localStorage
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            // If products are in localStorage, use them
            const parsedProducts = JSON.parse(storedProducts);
            setProducts(parsedProducts);
        } else {
            // Otherwise, fetch products from API and store in localStorage
            request("GET", "client-api/products").then((response) => {
                const fetchedProducts = response.data.payload.content;
                setProducts(fetchedProducts);
                localStorage.setItem('products', JSON.stringify(fetchedProducts));
            });
        }
    }, []);

    useEffect(() => {
        const tempProducts = products
            .filter(item => {
                // Handle product name search
                const productNameMatch = searchText === '' || item.name.toLowerCase().includes(searchText.toLowerCase());

                // Handle category search
                const categoryMatch = categorySearchText === '' || item.category.toLowerCase().includes(categorySearchText.toLowerCase());

                return productNameMatch && categoryMatch;
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
            });

        setFilteredProducts(tempProducts);
        const curMaxPage = Math.ceil(tempProducts.length / 10);
        setMaxPage(curMaxPage);
        setViewProducts(tempProducts.slice((page - 1) * 10, Math.min(page * 10 - 1, tempProducts.length - 1) + 1));
    }, [products, searchText, categorySearchText, filter]);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        setViewProducts(filteredProducts.slice((page - 1) * 10, Math.min(page * 10 - 1, filteredProducts.length - 1) + 1));
    }, [page, filteredProducts]);

    return (
        <div className="app__container">
            <div className="grid wide">
                <div className="row sm-gutter app__content">
                    <div className="col l-2 m-0 c-0">
                        <Category
                            searchText={categorySearchText} // Pass the category search state to Category
                            setSearchText={setCategorySearchText} // Update the category search state
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
    );
}
