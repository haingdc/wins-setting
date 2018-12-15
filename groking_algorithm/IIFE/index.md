IIFE là một dạng thức mà chúng ta cần nắm vững khi viết một chương trình Javascript. Trong bài viết này sẽ giúp các nắm rõ được nó.

# Dạng thức của IIFE

IIFE phát âm na ná là 'íph-phi'.

```js
(function () { 
    // ...
})();
```

hoặc

```js
(function () {
    // ...
}());
```

lưu ý:
- thêm dấu chấm phẩy.
- hàm có thể được đặt tên nếu thích

# Kiến trúc IIFE: giới thiệu một phạm vi mới

Đôi khi bạn không muốn tạo một biến có giá trị toàn cục. Để làm được như vậy, ta không thể đặt nơi khai báo biến ở **trong một khối lệnh** - block scope, thay vào đó, ta đặt ở trong một hàm, bởi vì biến có phạm vi hàm - function scope. Tuy nhiên, có một giải pháp để **giả lập phạm vi khối lệnh** tên là **IIFE** - Immediately Invoked Function Expression.

> Lưu ý 1: Khối lệnh được sử dụng để nhóm từ 0 tới nhiều câu lệnh. Nó được xác định bởi cặp ngoặc xoắn `{ }` và tùy chọn được đánh nhãn:

```js
{
    // các câu lệnh
}

tên_nhãn: {
    // các câu lệnh
}
```

> Lưu ý 2: Block scope - Phạm vi khối lệnh là rất phổ biến ở các ngôn ngữ khác. Lập trình viên mới từ các ngôn ngữ đấy chuyển sang sử dụng sẽ thấy khá bối rối khi làm quen với phạm vi của các biến trong Javascript.

VD về IIFE như sau:

```js
var a = 2;

(function foo(){

    var a = 3;
    console.log( a ); // 3

})();

console.log( a ); // 2
```

Dịch ra có nghĩa "biểu thức hàm được thực thi tức thời".

Giải thích: Khi ta đặt phần định nghĩa hàm trong cặp ngoặc tròn `( )` ta sẽ được một biểu thức hàm. Sau đó ta có thể thực thi hàm bằng cách thêm vào một cặp ngoặc `( )` nữa. Như vậy, ngoặc `( )` thứ nhất cho ta một biểu thức hàm, và ngoặc `( )` thứ hai sẽ thực thi hàm.

❓❓❓ Vẫn còn thắc mắc 🤔

> Tại sao nói IIFE đi giả lập phạm vi khối lệnh - block scope?

Trước tiên hãy xem một ví dụ sau:

```js
var person = "Alice";
var fruit = "apple";

var fruits = [
    "banana",
    "lemon",
    "mango",
    "peace"
];

for (var i = 0; i < fruits.length; i++) {
    var fruit = fruits[i];  // (2)
    console.log(person + " has a " + fruit);
}

console.log(person + " has an " + fruit);
// Outputs:
// Alice has a banana
// Alice has a lemon
// Alice has a mango
// Alice has a peace
// Alice has an peace
```
Một lập trình viên dùng ngôn ngữ sử dụng phạm vi khối lệnh sẽ không thấy có gì sai với đoạn mã trên, và nghĩ câu lệnh cuối sẽ cho kết quả - Alice has an **apple**. Vấn đề này đưa ra giải pháp là tránh khai báo các biến có chung tên trong cùng một phạm vi, chả hạn đổi tên `fruit` ở (2) thành `f`. Nhưng giả sử chúng ta thực sự muốn sử dụng phạm vi khối lệnh trong Javascript, ta có thể làm như sau:

```js
var person = "Alice";
var fruit = "apple";

var fruits = [
    "banana",
    "lemon",
    "mango",
    "peace"
];

for (var i = 0; i < fruits.length; i++) {
    (function() {
        var fruit = fruits[i];
        console.log(person + " has a " + fruit);
    })();
}

console.log(person + " has an " + fruit);
// Outputs:
// Alice has a banana
// Alice has a lemon
// Alice has a mango
// Alice has a peace
// Alice has an apple   <- cái ta cần
```
Giải pháp này sử dụng IIFE để giả lập phạm vi khối lệnh. Vì trong Javascript có cơ chế *phạm vi hàm*, chúng ta sẽ định nghĩa và gọi ngay một hàm mới trong mỗi lần lặp. Đây là cách thức tương tự phạm vi khối lệnh, có thể coi mỗi biến fruit chỉ hoạt động ở bên trong vòng lặp for.

# inadvertent sharing via closures
# Ngẫu nhiên chia sẻ biến thông qua closure

Cơ chế Closures giúp cho hàm ở bên trong có thể truy xuất tới các biến bên ngoài, mà trong một số trường hợp nó không phải cách bạn muốn:

```js
var result = [];
for (var year = 0; year < 5; year++) {
    result.push(function () { return year });  // (1)
}
console.log(result[1]()); // 5 (không phải 1)
console.log(result[3]()); // 5 (không phải 3)
```

Giá trị trả về ở dòng (1) luôn luôn là giá trị hiện thời của `year`, không phải giá trị tại mỗi thời điểm khởi tạo hàm nặc danh. Sau khi kết thúc vòng lặp, `year` có giá trị là 5, đó là lý do tại sao tất cả các hàm trong mảng cùng trả về 5. 😵😵😵

> ❓❓❓ Làm sao để hàm ở dòng (1) trả về giá trị của `year` tại các thời điểm khác nhau? 🤔

**Cách thức**: Vì `year` có phạm vi không chỉ trong vòng lặp for. Ta cần có một biến khác **chỉ có phạm vi** trong vòng lặp for. Vậy ta sẽ tạo ra một biến `y` có mục đích lưu giá trị tại thời điểm của từng lần lặp.

```js
var result = [];
for(var year = 0; year < 5; year++) {
    var y = year;                          // (2)
    result.push(function() { return y; }); // (3)
}
console.log(result[1]()); // 4 (không phải 1)
console.log(result[3]()); // 4 (không phải 3)
```

Đó vẫn chưa phải kết quả ta muốn. Điểm nữa là `y` không thỏa mãn tiêu chí **chỉ có phạm vi** trong khối lệnh của `for`. Ta cần phải "thu hẹp" phạm vi của `y`. Điều này được thực hiện bằng IIFE.

> A: Bằng cách nào?
> B: Đặt (2) & (3) vào `(function() {...})()`

```js
var result = [];
for(var year = 0; year < 5; year++) {
    (function() {
        var y = year;
        result.push(function() { return y; });
    })();
}
console.log(result[1]()); // 1
console.log(result[3]()); // 3
```

Lưu ý: Với ES6, sử dụng `let, const`, Javascript đã cho phép tạo biến có phạm vi khối lệnh

Thuật ngữ trong bài: #IIFE #immediately_invoked_function_expression #closure #block_scope #function_scope