import { useState, useEffect } from "react"

export function Home_filter({page, setPage, maxPage}) {
    
    const [state, setState] = useState(0);

    const filters = [
        "Phổ biến",
        "Mới nhất",
        "Bán chạy",
        'Giá: thấp đến cao',
        'Giá: cao đến thấp',
    ]

    const setFilter = (index) => {
        setState(index);
        localStorage.setItem('filter', filters[index]);
    }

    useEffect(() => {
        const currentFilter = localStorage.getItem('filter');
        if (currentFilter) {
            setState(filters.findIndex(item => item === currentFilter));
        }
    }, [])

    const pageOnChange = (numPage) => {
        if (numPage > 0 && numPage <= maxPage) {
            setPage(numPage);
            localStorage.setItem('page', numPage.toString());
        }
    }
    
    return (
        <div className="home-filter">
            <span className="home-filter__label">Sắp xếp theo</span>
            {
                filters.slice(0, 3).map((item, index) => (
                    <button 
                        key={index}
                        className={"btn home-filter__btn"+((filters[state] === item) ? " btn--primary" : "")}
                        onClick={()=>setFilter(index)}
                    >
                        {item}
                    </button>
                ))
            }

            <div className="select-input">
                <span className="select-input__label">{(state > 2) ? filters[state] : "Giá"}</span>
                <i className="select-input__icon fas fa-chevron-down"></i>
                
                <ul className="select-input__list">
                    {
                        filters.slice(3, 5).map((item, index) => (
                            <li key = {index} className="select-input__item">
                                <div 
                                    className="select-input__link"
                                    onClick={()=>setFilter(index + 3)}
                                >
                                    {item}
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
                        onClick={()=>pageOnChange(page - 1)}
                    >
                        <i className="home-filter__page-icon fas fa-chevron-left"></i>
                    </div>
                    <div 
                        className={"home-filter__page-btn"+((page === maxPage) ? " home-filter__page-icon--disable" : "")}
                        onClick={()=>pageOnChange(page + 1)}
                    >
                        <i className="home-filter__page-icon fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}