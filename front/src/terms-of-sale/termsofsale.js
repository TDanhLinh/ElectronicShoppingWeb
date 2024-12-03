import Link from "next/link"

export function TermsOfSale() {
    return (
        <div className="terms-of-sale-container">
            <Link href='/'>
                <button className='back-to-home'>
                    Quay về trang chủ
                </button>
            </Link>
            <h1>Điều khoản mua hàng</h1>
            <p>Chúng tôi vẫn còn nhiều sai sót và luôn mong muốn cố gắng cải thiện dịch vụ của mình. Nếu bạn phát hiện bất kỳ điều gì chưa hợp lý, xin vui lòng góp ý cho chúng tôi. Bạn có thể liên hệ với chúng tôi qua địa chỉ sau: <a href="/about">Giới thiệu</a></p>
            
            <p>Chúng tôi hy vọng bạn sẽ mua sắm một cách tận tâm và có trách nhiệm. Hãy để chúng tôi phục vụ bạn một cách tốt nhất có thể!</p>
        </div>
    );
}
