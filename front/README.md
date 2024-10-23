Cách sử dụng nextjs:<br/>
<br/>
Tạo 1 dự án rỗng và mở trong vscode<br/>
thực hiện     npm init --yes <br/>
              npm i next
<br/>
<br/>
nextjs sẽ hoạt động như sau:<br/>
<br/>
<br/>
Đầu tiên tạo 1 thư mục "pages"<br/>
tạo file index.js bên trong pages<br/>
pages sẽ sinh ra các trang được với tên là tên file trong page<br/>
<br/>
<br/>
VD nếu trong pages có about.js thì sẽ tạo web http://localhost:3000/about<br/>
Nếu trong pages có thư mục aloalo, trong thư mục aloalo có file home.js thì sẽ tạo web http://localhost:3000/aloalo/home<br/>
đối với index.js, web được sinh ra sẽ là http://localhost:3000<br/>
<br/>
<br/>
Đối với 1 trang web bình thường sẽ cần file .html, .html sẽ có thể head. Với nextjs thì sẽ không tạo file .html nào cả.<br/>
Nếu muốn có 1 file để hiển thị head và body như .html, tạo _document.js trong pages, chỉ nên thay đổi head, body chỉ thêm chứ không được xóa 2 thẻ Main với NextScript<br/>
Nếu muốn import các file css để cấu hình layout cho cả trang web, có thể tạo _app.js trong pages, chỉ được phép import, còn lại giữ nguyên<br/>
Đúng ra cả _document và _app đều dùng để thay đổi phần head, một số thẻ chỉ nên dùng trong _document và 1 số chỉ nên dùng trong _app. Khi chạy xem warning để biết rõ hơn.<br/>
<br/>
<br/>
tên file index.js, _app.js, _document là rất quan trọng, không nên thay đổi hay đặt trùng tên.<br/>
<br/>
<br/>
Để chạy nextjs, trong package.json, viết thêm như sau:<br/>
    "scripts": {<br/>
        ...,<br/>
        "dev": "next dev"<br/>
    },<br/>
<br/>
<br/>
Trong terminal thực hiện   next dev   hoặc    npm run dev   để xem trang web đã tạo, sẽ hiển thị 1 đường link
http://localhost:3000/<br/>
<br/>
<br/>
Trong các file js trong pages, bắt buộc phải export default thì mới tạo được trang mới<br/>
<br/>
<br/>
Thư mục public sẽ dùng để lưu các dữ liệu tĩnh như các ảnh hoặc css cục bộ<br/>
<br/>
<br/>
Về việc điều hướng:<br/>
Nếu để href bình thường, VD như href="/favicon.png" thì nó sẽ điều hướng tới public/favicon.png chứ không phải là pages/favicon.png<br/>
Để có thể điều hướng trong pages, VD trong pages có index.js, aaaa/about.js, home.js<br/>
đầu tiên     import Link from 'next/link'<br/>
(Link href="/aaaa/about")click me!(/Link) sẽ điều hướng tới aaaa/about.js( thay () thành <> )<br/>
(Link href="/")click me!(/Link) sẽ điều hướng tới index.js<br/>
(Link href="/home")click me!(/Link) sẽ điều hướng tới home.js<br/>
<br/>
<br/>
Không cần tải thêm react, nextjs đã có sẵn<br/>
<br/>
<br/>
Nếu không tạo trang nào mới thì các mã js nên để trong thư mục src<br/>
<br/>
<br/>
Hãy tra nextjs trên mạng để biết thêm các chức năng<br/>
<br/>
<br/>
Happy coding<br/>