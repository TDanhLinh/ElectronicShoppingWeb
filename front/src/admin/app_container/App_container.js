import {useState} from 'react';
import {SideBar} from './SideBar';
import ProductPage from "./ProductPage";
import OrderPage from "./OrderPage";
import CategoryPage from "./CategoryPage";
import RevenuePage from "./RevenuePage";
import AccountPage from "./AccountPage";

export function App_container() {
    const categories = [
        'Quản lý sản phẩm',
        'Quản lý đơn hàng',
        'Quản lý phân loại',
        'Doanh thu',
        'Quản lý tài khoản',
    ];

    const [sideBar, setSideBar] = useState(categories[0]);

    return (
        <div className="app__container">
            <div className="grid wide">
                <div className=" row sm-gutter app__content">
                    <div className="col l-2 m-0 c-0">
                        <SideBar sideBar={sideBar} setSideBar={setSideBar} categories={categories}/>
                    </div>
                    <div className="col l-10 m-12 c-12">
                        {
                            sideBar === 'Quản lý sản phẩm' &&
                            <ProductPage/>
                        }
                        {
                            sideBar === 'Quản lý đơn hàng' &&
                            <OrderPage/>
                        }
                        {
                            sideBar === 'Quản lý phân loại' &&
                            <CategoryPage/>
                        }
                        {
                            sideBar === 'Doanh thu' &&
                            <RevenuePage/>
                        }
                        {
                            sideBar === 'Quản lý tài khoản' &&
                            <AccountPage/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}