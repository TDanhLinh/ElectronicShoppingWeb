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
        <div class="home-filter hide-on-mobile-tablet">
            <span class="home-filter__label">Sắp xếp theo</span>
            {
                filter.map((item, index) => (
                    <button 
                        class={"btn home-filter__btn"+((state === item.type) ? " btn--primary" : "")}
                        onClick={()=>setState(item.type)}
                    >
                        {item.name}
                    </button>
                ))
            }

            <div class="select-input">
                <span class="select-input__label">{(state > 2) ? priceFilter[state-3].name : "Giá"}</span>
                <i class="select-input__icon fas fa-chevron-down"></i>
                
                <ul class="select-input__list">
                    {
                        priceFilter.map((item, index) => (
                            <li class="select-input__item">
                                <div 
                                    class="select-input__link"
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

            <div class="home-filter__page">
                <span class="home-filter__page-num">
                    <span class="home-filter__page-current">{page}</span>{'/'+maxPage}
                </span>
                <div class="home-filter__page-control">
                    <div 
                        class={"home-filter__page-btn"+((page === 1) ? " home-filter__page-icon--disable" : "")}
                        onClick={()=>{if (page > 1) setPage(page - 1)}}
                        style={{
                            cursor: (page === 1) ? "" : "pointer",
                        }}
                    >
                        <i class="home-filter__page-icon fas fa-chevron-left"></i>
                    </div>
                    <div 
                        class={"home-filter__page-btn"+((page === maxPage) ? " home-filter__page-icon--disable" : "")}
                        onClick={()=>{if (page < maxPage) setPage(page + 1)}}
                        style={{
                            cursor: (page === maxPage) ? "" : "pointer",
                        }}
                    >
                        <i class="home-filter__page-icon fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}