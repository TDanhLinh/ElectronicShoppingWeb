import Link from 'next/link';

export function Footer() {
    return (
        <footer className="footer">
            <div className="grid wide">
                <div className="row footer__content">
                    <div className="col l-2-4 m-4 c-8">
                        <h3 className="footer__heading">Chăm sóc khách hàng</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <Link href="/faq">Trung tâm trợ giúp</Link>
                            </li>
                            <li className="footer-item">
                                <Link href="/how-to-buy">Hướng dẫn mua hàng</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-2-4 m-4 c-4">
                        <h3 className="footer__heading">Giới thiệu</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <Link href="/about">Giới thiệu</Link>
                            </li>
                            <li className="footer-item">
                                <Link href="/under-dev">Tuyển dụng</Link>
                            </li>
                            <li className="footer-item">
                                <Link href="/terms-of-sale">Điều khoản</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-2-4 m-4 c-8">
                        <h3 className="footer__heading">Theo dõi chúng tôi</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <Link href="https://www.facebook.com/">
                                    <i className="fab fa-facebook"></i>
                                    Facebook                         
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link href="https://www.instagram.com/">
                                    <i className="fab fa-instagram"></i>
                                    Instagram
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link href="https://www.linkedin.com/">
                                    <i className="fab fa-linkedin"></i>
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">
                <div className="grid wide">
                    <p className="footer__text">© 2024 Website được làm bởi nhóm 30 - Website được tạo ra vì mục đích học tập, không vì mục đích thương mại</p>
                </div>
            </div>
        </footer>
    )
}