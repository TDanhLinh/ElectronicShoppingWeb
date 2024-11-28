export function Pagination({page, setPage, maxPage}) {

    const listNumber = [];

    if (maxPage <= 10) {
        for (let i = 1; i <= maxPage; i++) listNumber.push(i);
    }

    else {
        if (page > 5 && page < maxPage - 4) {
            listNumber.push(1, 2, 3, '...', page - 1, page, page + 1, '...', maxPage - 2, maxPage - 1, maxPage);
        }
        else if (page <= 5) {
            listNumber.push(1, 2, 3, 4, 5, 6, 7, '...', maxPage - 2, maxPage - 1, maxPage);
        }
        else if (page >= maxPage - 4) {
            listNumber.push(1, 2, 3, '...', maxPage - 6, maxPage - 5, maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage);
        }
    }

    const pageOnChange = (numPage) => {
        if (numPage !== '...' && numPage > 0 && numPage <= maxPage) {
            setPage(numPage);
            localStorage.setItem('page', numPage.toString());
        }
    }

    return (
        <ul className="pagination home-product__pagination">
            <li className="pagination-item">
                <div className="pagination-item-link pagination-item-link-hover" onClick={() => pageOnChange(page - 1)}>
                    <i className="pagination-item__icon fas fa-chevron-left"></i>
                </div>
            </li>
            {
                listNumber.map((item, index) => (
                    <li key={index} className="pagination-item">
                        <div 
                            className={"pagination-item-link" + ((item === page) ? " pagination-item-link--active" : " pagination-item-link-hover")}
                            onClick={() => pageOnChange(item)}
                        >{item}</div>
                    </li>
                ))
            }
            <li className="pagination-item">
                <div className="pagination-item-link pagination-item-link-hover" onClick={() => pageOnChange(page + 1)}>
                    <i className="pagination-item__icon fas fa-chevron-right"></i>
                </div>
            </li>
        </ul>
    )
}