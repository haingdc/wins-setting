#Javascript: Định dạng mã Javascript với Prettier

Các dấu chấm phẩy là một phần trong Javascript. Tuy vậy, nó cũng gây ra nhiều tranh cãi cho các lập trình viên. Khi chạy chương trình, nhờ có cơ chế <span style="text-decoration: underline;">tự động thêm vào dấu chấm phẩy - Automatic semicolon insertion (ASI)</span> nên nhiều lúc ta không cần tới bọn nó. Tuy nhiên, có những câu lệnh Javascript phải được kết thúc với dấu chấm phẩy và bởi vậy ảnh hưởng tới cơ chế ASI. Trong một team có thể có người chấp nhận nó và người không ưu dấu chấm phẩy.

Không may chấp nhận nó thường không phải là chúng ta 🤣🤣🤣. Cuối cùng, sự nhất quán là chia khóa đem tới sự ăn ý của một team. Chính vì vậy, có một công cụ tên là [Prettier](https://github.com/prettier/prettier) được đưa ra để đảm bảo sự hòa bình cho mọi người. Prettier hỗ trợ các ngôn ngữ JavaScript · Flow · TypeScript · CSS · SCSS · Less · GraphQL · JSON · Markdown . Nó giúp chúng ta tiết kiệm thời gian khi định dạng - format code. Hạn chế việc phải gõ dấu chấm phẩy, nút cách, nút enter,... Đồng thời thống nhất phong cách code chung của mỗi người. Nó được tích hợp hầu hết các chương trình viết code phổ biến như Atom, Emacs, Vim, Visual Studio Code, Visual Studio, Sublime Text, JetBrains WebStorm, PyCharm,...

Dưới đây là một vài ví dụ:

```js
// Trước
// không cần dấu cách, viết tất cả trong cùng một dòng
foo(reallyLongArg(),omgSoManyParameters(),IShouldRefactorThis(),isThereSeriouslyAnotherOne())
```

```js
// Sau khi format code với Prettier
// Xuống dòng và thêm dấu chấm phẩy
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne(),
);
```


```js
// Trước
// đoạn code trông vô cùng xộc xệch
  foo({ num: 3 }, 1, 2);
foo( { num:3}, 1, 2); foo( { num: 3 }, 1, 2 )
```

```js
// Sau
// Tút lại trong tích tắc
foo({ num: 3 }, 1, 2);
foo({ num: 3 }, 1, 2);
foo({ num: 3 }, 1, 2);
```

Tất cả những thứ trên ta dễ dàng thực hiện bằng cách gõ tổ hợp phím save (Ctrl+S) và mọi thứ lại trở nên gọn gàng. Chúng ta chỉ việc viết code thật thoải mái, lộn xộn và việc format code không còn là vấn đề. Hãy xem trên trang [tùy chọn](https://prettier.io/docs/en/options.html) để tìm hiểu thêm về các thiết lập. Thử xem, tôi tin bạn cũng thấy Prettier vô cùng hữu ích.

**Lưu ý**: Prettier hoạt động theo quy tắc của nó, format có thể không như bạn mong đợi, việc kiểm tra kết quả sau khi format là cần thiết.  Lời khuyên là, chúng ta nên sử dụng tính năng như **format từng đoạn code** hay tránh viết một đoạn code dài rồi format như thế sẽ khó kiểm tra.

Bài viết có sử dụng thông tin của page https://davidwalsh.name/javascript-semicolons