import { useState } from "react"

export function Mobile_category() {

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
        <nav className="mobile-category">
            <ul className="mobile-category__list">
                {
                    category.map((item, index) => (
                        <li className="mobile-category__item">
                            <div className="mobile-category__link">{item.name}</div>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}