import { useState, useEffect } from 'react';
import { Category } from './Category';
import { User_information } from './User_information';
import { UpdatePhonenumber } from './Update_phonenumber';
import { UpdateEmail } from './Update_email';
import { ChangePassword } from './Change_password';

export function App_container() {
    const categories = [
        'Thông tin tài khoản',
        'Sản phẩm đã mua',
        'Cập nhật sđt',
        'Cập nhật email',
        'Thay đổi mật khẩu'
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
                            category === 'Cập nhật email' &&
                            <UpdateEmail />
                        }
                        {
                            category === 'Thay đổi mật khẩu' &&
                            <ChangePassword />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}