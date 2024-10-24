import { useState } from "react";

export function Category() {
    const [active, setActive] = useState(0);
    
    const [category, setCategory] = useState([
        {
            type: 0,
            name: 'Trang điểm mặt'
        },
        {
            type: 1,
            name: 'Trang điểm môi'
        },
        {
            type: 2,
            name: 'Trang điểm mắt'
        },
        {
            type: 3,
            name: 'Makup collection'
        },
        {
            type: 4,
            name: 'Dưỡng da'
        },
        {
            type: 5,
            name: 'Kem dưỡng ẩm'
        },
    ])
    
    return (
        <nav className="category">
            <h3 className="category__heading">Danh mục</h3>
            <ul className="category-list">
                {
                    category.map((item, index) => (
                        <li key={index} className={"category-item"+((item.type === active) ? " category-item--active" : "")}>
                            <div
                                className="category-item__link"
                                onClick={()=>setActive(item.type)}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                {item.name}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}