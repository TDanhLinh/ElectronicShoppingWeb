import { useState, useEffect } from 'react';

export function Search_input() {
    const [historyList, setHistoryList] = useState([]);
    const [searchtext, setSearchtext] = useState('');
    const [focus, setFocus] = useState(false)

    useEffect(() => {
        const history = localStorage.getItem('historyList');
        if (history) {
            setHistoryList(JSON.parse(history));
        }
    }, []);

    const search = () => {
        if (searchtext !== '') {
            const updatedHistoryList = historyList.filter(item => item !== searchtext);
            updatedHistoryList.unshift(searchtext);
            setHistoryList(updatedHistoryList);
            localStorage.setItem('historyList', JSON.stringify(updatedHistoryList));
        }
    };

    return (
        <div className="header__search">
            <div className="header__search-input-wrap">
                <input 
                    type="text" 
                    className="header__search-input" 
                    placeholder="Nhập để tìm kiếm sản phẩm"
                    value={searchtext}
                    onChange={(e) => setSearchtext(e.target.value)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setTimeout(() => setFocus(false), 200)}
                />
                {
                    focus &&
                    <div className="header__search-history">
                        <h3 className="header__search-history-heading">Lịch sử tìm kiếm</h3>
                        <ul className="header__search-history-list">
                            {
                                historyList.slice(0, 5).map((history, index) => (
                                    <li 
                                        key={index} 
                                        className="header__search-history-item"
                                        onClick={() => {setSearchtext(history)}}
                                    >
                                        <div className='header__search-history-item-text'>{history}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
            <button
                className="header__search-btn"
                onClick={search}
            >
                <i className="header__search-btn-icon fas fa-search"></i>
            </button>
        </div>
    );
}