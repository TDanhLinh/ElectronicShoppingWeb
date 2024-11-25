import { useState, useEffect } from "react"

export function Notify() {
    
    const [notifyList, setNotifyList] = useState([]);

    useEffect(() => {
        // lấy ra danh sách thông báo từ database, hiện tại chưa có axios
        const notify = localStorage.getItem('notifyList');
        if (notify) {
            let temp = JSON.parse(notify);
            setNotifyList(temp);
        }
        else {
            const sample = [
                {
                    src: './assets/img/notify1.png',
                    name: 'Tặng ngay combo 5 gói mặt nạ thải độc',
                    description: 'Khuyến mãi siêu hot',
                    isChecked: false, // nếu ấn vào thông báo thì isChecked = true, xóa thông báo khỏi database
                },
                {
                    src: './assets/img/notify2.png',
                    name: 'Day Shield Perfect Sun - Cho nàng thơ tự tin "tỏa nắng"',
                    description: '',
                    isChecked: false,
                },
                {
                    src: './assets/img/notify3.png',
                    name: 'CHĂM SÓC KHÔNG QUÊN CHỐNG NẮNG',
                    description: 'Kem Chống nắng Whoo Gongjinhyang Soo',
                    isChecked: false,
                },
                {
                    src: './assets/img/notify4.png',
                    name: 'DA DẦU CÓ CẦN DƯỠNG ẨM',
                    description: 'Whoo Gongjinhyang',
                    isChecked: false,
                },
                {
                    src: './assets/img/notify5.png',
                    name: 'KHỞI ĐẦU CỦA LÀN DA KHỎE ĐẸP',
                    description: 'Ohui Prime Advancer',
                    isChecked: false,
                },
                {
                    src: './assets/img/notify6.png',
                    name: 'MINI GAME - CHƠI NGAY RINH QUÀ LIỀN TAY',
                    description: 'Mini game',
                    isChecked: false,
                },
            ]
            setNotifyList(sample);
            localStorage.setItem('notifyList', JSON.stringify(sample));
        }
    }, [])

    const checkAll = () => {
        const updatedList = notifyList.map((notify) => ({
            ...notify,
            isChecked: true,
        }));
        setNotifyList(updatedList);
        localStorage.setItem('notifyList', JSON.stringify(updatedList));
    }

    const check = (index) => {
        const updatedList = notifyList.map((notify, i) => 
            i === index ? { ...notify, isChecked: true } : notify
        );
        setNotifyList(updatedList);
        localStorage.setItem('notifyList', JSON.stringify(updatedList));
    }
    
    return (
        <li className="header__navbar-item header__navbar-item--notify">
            <i className="header_navbar-icon far fa-bell"></i>
            <a href="" className="header__navbar-item-link">Thông báo</a>
            <div className="header__notify">
                <header className="header__notify-header">
                    <h3>Thông báo mới nhận</h3>
                </header>
                <ul className="header__notify-list">
                    {
                        notifyList.map((notify, index) => (
                            <li
                                key={index} 
                                className="header__notify-item"
                                style={{backgroundColor: (notify.isChecked) ? "#f8f8f8" : "rgba(254, 84, 48, 0.2)"}}
                                onClick={() => check(index)}
                            >
                                <div className="header__notify-link">
                                    <img src={notify.src} alt="" className="header__notify-img"/>
                                    <div className="header__notify-info">
                                        <strong><span className="header__notify-name">{notify.name}</span></strong>
                                        <span className="header__notify-description">{notify.description}</span>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <footer className="header__notify-footer">
                    <div
                        className="header__notify-footer-link"
                        onClick={checkAll}
                    >
                        Đánh dấu đã xem
                    </div>
                </footer>
            </div>
        </li>
    )
}