import { useState } from "react"

export function Home_filter() {
    
    const [state, setState] = useState(0);
    const [filter, setFilter] = useState([
        {
            type: 0,
            name: "Phổ biến"
        },
        {
            type: 1,
            name: "Mới nhất"
        },
        {
            type: 2,
            name: "Bán chạy"
        },
    ])
    const [priceFilter, setPriceFilter] = useState([
        {
            type: 3,
            name: 'Giá: thấp đến cao'
        },
        {
            type: 4,
            name: 'Giá: cao đến thấp'
        },
    ])
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(69);
    
    return (
        <div className="home-filter hide-on-mobile-tablet">
            <span className="home-filter__label">Sắp xếp theo</span>
            {
                filter.map((item, index) => (
                    <button 
                        key={index}
                        className={"btn home-filter__btn"+((state === item.type) ? " btn--primary" : "")}
                        onClick={()=>setState(item.type)}
                    >
                        {item.name}
                    </button>
                ))
            }

            <div className="select-input">
                <span className="select-input__label">{(state > 2) ? priceFilter[state-3].name : "Giá"}</span>
                <i className="select-input__icon fas fa-chevron-down"></i>
                
                <ul className="select-input__list">
                    {
                        priceFilter.map((item, index) => (
                            <li key = {index} className="select-input__item">
                                <div 
                                    className="select-input__link"
                                    onClick={()=>setState(item.type)}
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
            </div>

            <div className="home-filter__page">
                <span className="home-filter__page-num">
                    <span className="home-filter__page-current">{page}</span>{'/'+maxPage}
                </span>
                <div className="home-filter__page-control">
                    <div 
                        className={"home-filter__page-btn"+((page === 1) ? " home-filter__page-icon--disable" : "")}
                        onClick={()=>{if (page > 1) setPage(page - 1)}}
                        style={{
                            cursor: (page === 1) ? "default" : "pointer",
                        }}
                    >
                        <i className="home-filter__page-icon fas fa-chevron-left"></i>
                    </div>
                    <div 
                        className={"home-filter__page-btn"+((page === maxPage) ? " home-filter__page-icon--disable" : "")}
                        onClick={()=>{if (page < maxPage) setPage(page + 1)}}
                        style={{
                            cursor: (page === maxPage) ? "default" : "pointer",
                        }}
                    >
                        <i className="home-filter__page-icon fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}