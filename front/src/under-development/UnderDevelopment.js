import Link from "next/link"

export function UnderDevelopment() {
    return (
        <div className="container">
            <Link href='/'>
                <button className='back-to-home'>
                    Quay về trang chủ
                </button>
            </Link>
            <h1 className='describe'>Hiện tại tính năng này đang được phát triển</h1>
        </div>
    )
}