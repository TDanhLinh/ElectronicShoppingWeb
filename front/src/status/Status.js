import Link from "next/link"
import { useState, useEffect } from 'react';

export function Status() {
    const [status, setStatus] = useState('thành công');

    useEffect(() => {
        // kiểm tra thanh toán và cập nhật biến status
    }, [])

    return (
        <div className="container">
            <Link href='/'>
                <button className='back-to-home'>
                    Quay về trang chủ
                </button>
            </Link>
            <h1 className='describe'>Thanh toán {status}</h1>
        </div>
    )
}