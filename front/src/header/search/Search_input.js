import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// search input để lấy thông tin tìm kiếm của người dùng
export function Search_input({setSearchText}) {
    const router = useRouter();

    const [historyList, setHistoryList] = useState([]);
    const [focus, setFocus] = useState(false);
    const [text, setText] = useState('');
    useEffect(() => {
        // lấy lịch sử tìm kiểm từ database, thiếu axios
        const history = localStorage.getItem('historyList');
        if (history) {
            setHistoryList(JSON.parse(history));
        }
    }, []);

    const search = () => {
        if (text !== '') {
            setSearchText(text.toLowerCase());

            const updatedHistoryList = historyList.filter(item => item !== text);
            updatedHistoryList.unshift(text);
            setHistoryList(updatedHistoryList);

            // cập nhật lịch sử tìm kiếm lên database, chưa có axios
            localStorage.setItem('historyList', JSON.stringify(updatedHistoryList));
            if (router.asPath !== '/') {
                router.push('/');
            }
        }
    };

    return (
        <div className="header__search">
            <div className="header__search-input-wrap">
                <input
                    type="text"
                    className="header__search-input"
                    placeholder="Nhập để tìm kiếm sản phẩm"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onClick={() => setFocus(true)}
                    onBlur={() => setTimeout(() => setFocus(false), 200)}
                    onKeyUp={(e) => {if (e.key === 'Enter') {search(); setFocus(false);}}}
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
                                        onClick={() => {setText(history); search(); setFocus(false)}}
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