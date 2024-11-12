import { useState, useEffect } from 'react';
import { Category } from './Category';
import { User_information } from './User_information';

export function App_container() {
    const categories = [
        'Thông tin tài khoản',
        'Quản lý sản phẩm',
    ];

    const [category, setCategory] = useState('');

    useEffect(() => {
        
        setCategory(categories[0]);
        localStorage.setItem('userSelect', categories[0]);
    }, [])

    return (
        <div className="app__container">
            <div className="grid wide">
                <div className=" row sm-gutter app__content">
                    <div className="col l-2 m-0 c-0">
                        <Category category={category} setCategory={setCategory} categories={categories} />
                    </div>
                    <div className="col l-10 m-12 c-12">
                        <User_information />
                    </div>
                </div>
            </div>
        </div>
    )
}