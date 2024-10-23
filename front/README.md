Cách sử dụng nextjs:

Tạo 1 dự án rỗng và mở trong vscode
thực hiện     npm init --yes
              npm i next

nextjs sẽ hoạt động như sau:

Đầu tiên tạo 1 thư mục "pages"
tạo file index.js bên trong pages
pages sẽ sinh ra các trang được với tên là tên file trong page

VD nếu trong pages có about.js thì sẽ tạo web http://localhost:3000/about
nếu trong pages có thư mục aloalo, trong thư mục aloalo có file home.js thì sẽ tạo web http://localhost:3000/aloalo/home
đối với index.js, web được sinh ra sẽ là http://localhost:3000

Đối với 1 trang web bình thường sẽ cần file .html, .html sẽ có thể head. Với nextjs thì sẽ không tạo file .html nào cả.
Nếu muốn có 1 file để hiển thị head và body như .html, tạo _document.js trong pages, chỉ nên thay đổi head, body chỉ thêm chứ không được xóa 2 thẻ Main với NextScript
Nếu muốn import các file css để cấu hình layout cho cả trang web, có thể tạo _app.js trong pages, chỉ được phép import, còn lại giữ nguyên

tên file index.js, _app.js, _document là rất quan trọng, không nên thay đổi hay đặt trùng tên.

Để chạy nextjs, trong package.json, viết thêm như sau:
    "scripts": {
        ...,
        "dev": "next dev"
    },

Trong terminal thực hiện   next dev   hoặc    npm run dev   để xem trang web đã tạo, sẽ hiển thị 1 đường link
http://localhost:3000/

Trong các file js trong pages, bắt buộc phải export default thì mới tạo được trang mới

Thư mục public sẽ dùng để lưu các dữ liệu tĩnh như các ảnh hoặc css cục bộ

Về việc điều hướng:
Nếu để href bình thường, VD như href="/favicon.png" thì nó sẽ điều hướng tới public/favicon.png chứ không phải là pages/favicon.png
Để có thể điều hướng trong pages, VD trong pages có index.js, aaaa/about.js, home.js
đầu tiên     import Link from 'next/link'
<Link href="/aaaa/about">click me!</Link> sẽ điều hướng tới aaaa/about.js
<Link href="/">click me!</Link> sẽ điều hướng tới index.js
<Link href="/home">click me!</Link> sẽ điều hướng tới home.js

Không cần tải thêm react, nextjs đã có sẵn

Nếu không tạo trang nào mới thì các mã js nên để trong thư mục src

Hãy tra nextjs trên mạng để biết thêm các chức năng

Happy coding