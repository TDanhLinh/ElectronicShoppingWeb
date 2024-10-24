import { useState } from 'react';

export function Search_input() {
    const [historyList, setHistoryList] = useState([
        {
            href: '',
            name: 'Đồng hồ'
        },
        {
            href: '',
            name: 'Lò vi sóng'
        },
        {
            href: '',
            name: 'Kem dưỡng ẩm'
        },
    ])

    return (
        <div className="header__search hide-on-mobile">
            <div className="header__search-input-wrap">
                <input type="text" className="header__search-input" placeholder="Nhập để tìm kiếm sản phẩm"/>
                <div className="header__search-history">
                    <h3 className="header__search-history-heading">Lịch sử tìm kiếm</h3>
                    <ul className="header__search-history-list">
                        {
                            historyList.map((history, index) => (
                                <li key={index} className="header__search-history-item">
                                    <a href={history.href}>{history.name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <button className="header__search-btn">
                <i className="header__search-btn-icon fas fa-search"></i>
            </button>
        </div>
    )
}