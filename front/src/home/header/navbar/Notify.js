import { useState } from "react"

export function Notify() {
    
    const [notifyList, setNotifyList] = useState([
        {
            href: '',
            src: './assets/img/notify1.png',
            name: 'Tặng ngay combo 5 gói mặt nạ thải độc',
            description: 'Khuyến mãi siêu hot'
        },
        {
            href: '',
            src: './assets/img/notify2.png',
            name: 'Day Shield Perfect Sun - Cho nàng thơ tự tin "tỏa nắng"',
            description: ''
        },
        {
            href: '',
            src: './assets/img/notify3.png',
            name: 'CHĂM SÓC KHÔNG QUÊN CHỐNG NẮNG',
            description: 'Kem Chống nắng Whoo Gongjinhyang Soo'
        },
        {
            href: '',
            src: './assets/img/notify4.png',
            name: 'DA DẦU CÓ CẦN DƯỠNG ẨM',
            description: 'Whoo Gongjinhyang'
        },
        {
            href: '',
            src: './assets/img/notify5.png',
            name: 'KHỞI ĐẦU CỦA LÀN DA KHỎE ĐẸP',
            description: 'Ohui Prime Advancer'
        },
        {
            href: '',
            src: './assets/img/notify6.png',
            name: 'MINI GAME - CHƠI NGAY RINH QUÀ LIỀN TAY',
            description: 'Mini game'
        },
        {
            href: '',
            src: './assets/img/notify7.png',
            name: 'CHƯƠNG TRÌNH KHUYẾN MÃI CHÀO THÁNG 5',
            description: 'Khuyến mãi chào hè!'
        },
    ]);
    
    return (
        <div className="header__notify">
            <header className="header__notify-header">
                <h3>Thông báo mới nhận</h3>
            </header>
            <ul className="header__notify-list">
                {
                    notifyList.map((notify, index) => (
                        <li key={index} className="header__notify-item header__notify-item--viewed">
                            <a href={notify.href} className="header__notify-link">
                                <img src={notify.src} alt="" className="header__notify-img"/>
                                <div className="header__notify-info">
                                    <strong><span className="header__notify-name">{notify.name}</span></strong>
                                    <span className="header__notify-description">{notify.description}</span>
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
            <footer className="header__notify-footer">
                <a href="" className="header__notify-footer-link">Xem tất cả</a>
            </footer>
        </div>
    )
}