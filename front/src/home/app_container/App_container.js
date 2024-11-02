import { Category } from "./Category";
import { Home_filter } from "./Home_filter";
import { Home_product } from "./Home_product"; 
import { Pagination } from "./Pagination";
import { useState, useEffect } from 'react';

export function App_container() {
    const [page, setPage] = useState(1);

    const [maxPage, setMaxPage] = useState(1);

    useEffect(() => {
        const currentPage = localStorage.getItem('page');
        if (currentPage) {
            setPage(Number(currentPage));
        }
        else {
            setPage(1);
            localStorage.setItem('page', '1');
        }

        const currentMaxPage = localStorage.getItem('maxPage');
        if (currentMaxPage) {
            setMaxPage(Number(currentMaxPage));
        }
        else {
            setMaxPage(14);
            localStorage.setItem('maxPage', '14');
        }
    }, [])
    
    return (
        <div className="app__container">
            <div className="grid wide">
                <div className=" row sm-gutter app__content">
                    <div className="col l-2 m-0 c-0">
                        <Category />
                    </div>
                    <div className="col l-10 m-12 c-12">
                        <Home_filter page={page} setPage={setPage} maxPage={maxPage}/>
                        <Home_product />
                        <Pagination page={page} setPage={setPage} maxPage={maxPage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}