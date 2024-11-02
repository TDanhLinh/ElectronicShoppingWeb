import Link from 'next/link';

export function Footer() {
    return (
        <footer className="footer">
            <div class="grid wide">
                <div class="row footer__content">
                    <div class="col l-2-4 m-4 c-8">
                        <h3 class="footer__heading">Chăm sóc khách hàng</h3>
                        <ul class="footer-list">
                            <li class="footer-item">
                                <Link href="">Trung tâm trợ giúp</Link>
                            </li>
                            <li class="footer-item">
                                <Link href="">Hướng dẫn mua hàng</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="col l-2-4 m-4 c-4">
                        <h3 class="footer__heading">Giới thiệu</h3>
                        <ul class="footer-list">
                            <li class="footer-item">
                                <Link href="">Giới thiệu</Link>
                            </li>
                            <li class="footer-item">
                                <Link href="">Tuyển dụng</Link>
                            </li>
                            <li class="footer-item">
                                <Link href="">Điều khoản</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="col l-2-4 m-4 c-8">
                        <h3 class="footer__heading">Theo dõi chúng tôi</h3>
                        <ul class="footer-list">
                            <li class="footer-item">
                                <Link href="https://www.facebook.com/">
                                    <i class="fab fa-facebook"></i>
                                    Facebook                         
                                </Link>
                            </li>
                            <li class="footer-item">
                                <Link href="https://www.instagram.com/">
                                    <i class="fab fa-instagram"></i>
                                    Instagram
                                </Link>
                            </li>
                            <li class="footer-item">
                                <Link href="https://www.linkedin.com/">
                                    <i class="fab fa-linkedin"></i>
                                    LinkedIn
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div class="col l-2-4 m-4 c-4">
                        <h3 class="footer__heading">Chưa nghĩ ra</h3>
                        <ul class="footer-list">
                            <li class="footer-item">
                                <Link href="">Nội dung 1</Link>
                            </li>
                            <li class="footer-item">
                                <Link href="">Nội dung 2</Link>
                            </li>
                            <li class="footer-item">
                                <Link href="">Nội dung 3</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="col l-2-4 m-8 c-12">
                        <h3 class="footer__heading footer__download-mobile">Vào cửa hàng trên ứng dụng</h3>
                        <div class="footer__download">
                            <img src="./assets/img/QR_code.png" alt="Download QR" class="footer__download-qr"/>
                            <div class="footer__download-app">
                                <Link href="https://www.Googleplay.com" class="footer__download-app-link">
                                    <img src="./assets/img/GooglePlay.png" alt="Google play" class="footer__download-icon"/>
                                </Link>
                                <Link href="" class="footer__download-app-link">
                                    <img src="./assets/img/Appstore.png" alt="Appstore" class="footer__download-icon"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer__copyright">
                <div class="grid wide">
                    <p class="footer__text">© 2024 Website được làm bởi nhóm 30 - Website được tạo ra vì mục đích học tập, không vì mục đích thương mại</p>
                </div>
            </div>
        </footer>
    )
}