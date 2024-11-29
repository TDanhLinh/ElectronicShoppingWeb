import { useState, useEffect } from 'react';
import { Category } from './Category';
import { User_information } from './User_information';
import { UpdatePhonenumber } from './Update_phonenumber';
import { ChangePassword } from './Change_password';
import { DeleteAccount } from './Delete_account';
import { BoughtProducts } from './Bought_products';
import { CommentProduct } from './Comment_product';

export function App_container() {
    const categories = [
        'Thông tin tài khoản',
        'Sản phẩm đã mua',
        'Đánh giá sản phẩm',
        'Cập nhật sđt',
        'Thay đổi mật khẩu',
        'Xóa tài khoản',
    ];

    const [category, setCategory] = useState(categories[0]);

    return (
        <div className="app__container">
            <div className="grid wide">
                <div className=" row sm-gutter app__content">
                    <div className="col l-2 m-0 c-0">
                        <Category category={category} setCategory={setCategory} categories={categories} />
                    </div>
                    <div className="col l-10 m-12 c-12">
                        {
                            category === 'Thông tin tài khoản' &&
                            <User_information 
                                setCategory = {setCategory}
                            />
                        }
                        {
                            category === 'Cập nhật sđt' &&
                            <UpdatePhonenumber />
                        }
                        {
                            category === 'Thay đổi mật khẩu' &&
                            <ChangePassword />
                        }
                        {
                            category === 'Xóa tài khoản' &&
                            <DeleteAccount />
                        }
                        {
                            category === 'Sản phẩm đã mua' &&
                            <BoughtProducts />
                        }
                        {
                            category === 'Đánh giá sản phẩm' &&
                            <CommentProduct />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}