import { useState, useEffect } from "react";

// Lưu các danh mục, danh mục sẽ tương đương với phần tìm kiếm ở header
export function Category({searchText, setSearchText}) {
    const categories = [
        'Đồng hồ thông minh',
        'Iphone',
        'Samsung',
        'Máy vi tính',
        'Macbook',
    ];

    const clickOnCategory = (item) => {
        setSearchText(item.toLowerCase());
    }
    
    return (
        <nav className="category">
            <h3 className="category__heading">Danh mục</h3>
            <ul className="category-list">
                {
                    categories.map((item, index) => (
                        <li 
                            key={index} 
                            className={"category-item"+((searchText.toLowerCase() === item.toLowerCase()) ? " category-item--active" : "")}
                        >
                            <div
                                className="category-item__link"
                                onClick={()=>clickOnCategory(item)}
                            >
                                {item}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}