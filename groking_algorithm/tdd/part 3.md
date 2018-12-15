Đây là phần ba trong ba phần của se-ri giới thiệu về việc phát triển theo hướng kiểm thử - TDD trong Javascript. Trong bài viết trước, chúng ta được tìm hiểu cách để kiểm tra code bất đồng bộ, cũng như sử dụng các stub ở những nơi liên quan tới môi trường mạng. Xuyên suốt se-ri này chúng ta cùng nhau xây dựng một ứng dụng nhỏ để giải thích các khái niệm của TDD. Trong bài hôm nay, chúng ta sẽ viết kiểm thử cho các phần code phục vụ cho việc tạo HTML và thao tác với DOM. Chúng ta cũng sẽ hoàn thành ứng dụng này bằng việc lắp ghép mọi thứ với nhau.

+ Phần 1: [Bắt đầu với các kiểm thử đơn vị - unit test](https://medium.com/@vnknowledge/gi%E1%BB%9Bi-thi%E1%BB%87u-v%E1%BB%81-tdd-a845571cd6ec)
+ Phần 2: [Gửi các request tới server thông qua TDD](https://medium.com/@vnknowledge/gi%E1%BB%9Bi-thi%E1%BB%87u-v%E1%BB%81-tdd-ph%E1%BA%A7n-ii-g%E1%BB%ADi-c%C3%A1c-request-t%E1%BB%9Bi-server-th%C3%B4ng-qua-tdd-bbf9daf91b)
+ Phần 3: Thao tác với DOM thông qua TDD

# I. Xử lí mã HTML dưới dạng chuỗi

Như vậy, tôi đã có một mô-đun để lấy về một danh sách các bức ảnh từ Flickr và xử lí chúng để theo định dạng mình muốn. Bước tiếp theo là lấy dữ liệu và đưa nó vào một trang của mình. Tôi sẽ tiến hành tạo mới một mô-đun để trình bày dữ liệu có được. Trước hết tạo mới file có tên **photo-lister.js**.

Hoàn toàn dễ dàng, tôi có thể viết một bài test đơn giản để kiểm tra xem mô-đun đã được tạo ra chưa.

```js
// photo-lister-spec.js
var expect = require("chai").expect,
  PhotoLister = require("./photo-lister");

describe("PhotoLister", function() {
  it("should exist", function() {
    expect(PhotoLister).not.to.be.undefined;
  });
});
```

Tôi sẽ thực thi file test mới tạo trên cái màn hình đen:

```terminal
mocha --reporter=nyan photo-lister-spec.js
```

Kết quả test là thành công, mặc dù **photo-lister.js** là một file trắng ([Giải thích ở đây](https://medium.com/@vnknowledge/gi%E1%BB%9Bi-thi%E1%BB%87u-v%E1%BB%81-tdd-a845571cd6ec#a5e6)). Giờ là lúc cần ngẫm nghĩ. Tôi muốn lấy được một danh sách các đối tượng photo để chuyển đổi chúng sang một danh sách HTML chứa các thẻ `<figure>`. Với tôi, bất kì khi nào làm việc với một danh sách, tôi luôn chọn sử dụng **map** hoặc **reduce** cho việc thao tác với từng phần tử trong đó. Vì vậy tôi sẽ tạo ra một hàm nhận chỉ một đối tượng photo, sau đó chuyển đổi sang dạng HTML:

```js
// photo-lister-spec.js
describe("#photoToListItem()", function() {
  it("should take a photo object and return a list item string", function() {
    var input = {
        title: "This is a test",
        url: "http://loremflickr.com/960/593",
      },
      expected =
        '<li><figure><img src="http://loremflickr.com/960/593" alt=""/>' +
        "<figcaption>This is a test</figcaption></figure></li>";
    expect(PhotoLister.photoToListItem(input)).to.equal(expected);
  });
});
```

Lưu ý, vì là so sánh chuỗi nên tôi sử dụng phương thức **equal()** thay vì **eq()**.

Chạy test, hiển thị hình con mèo buồn thông báo hàm không tồn tại. Vì vậy tôi sẽ thêm các dòng sau vào trong code mô-đun:

```js
// photo-lister.js
var PhotoLister;

PhotoLister = {
    photoToListItem: function() {}
};

module.exports = PhotoLister;
```

Khi chạy test lần nữa tôi vẫn không qua được bài test, có nghĩa là tôi vẫn cần điều chỉnh trong code mô-đun. Cách đơn giản nhất mà tôi sẽ làm là trả về giá trị cứng mà nó muốn:

```js
// photo-lister.js
PhotoLister = {
  photoToListItem: function() {
    return (
      '<li><figure><img src="http://loremflickr.com/960/593" alt=""/>' +
      "<figcaption>This is a test</figcaption></figure></li>"
    );
  },
};
```

Giờ chạy test tôi đã có thể thành công. Chuyển sang bước tái cấu trúc. Hiện tại tôi đang trả về một chuỗi cố định, vậy nên không có gì để cải thiện ở đây. Tôi sẽ viết tiếp vào bài test đang có:

```js
// photo-lister-spec.js
describe("#photoToListItem()", function() {
  it("should take a photo object and return a list item string", function() {
    var input = {
        title: "This is a test",
        url: "http://loremflickr.com/960/593",
      },
      expected =
        '<li><figure><img src="http://loremflickr.com/960/593" alt=""/>' +
        "<figcaption>This is a test</figcaption></figure></li>";
    expect(PhotoLister.photoToListItem(input)).to.equal(expected);

    input = {
      title: "This is another test",
      url: "http://loremflickr.com/960/593/puppy",
    };
    expected =
      '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>' +
      "<figcaption>This is another test</figcaption></figure></li>";
    expect(PhotoLister.photoToListItem(input)).to.equal(expected);
  });
});
```

Kết quả test lại không thành công. Cách dễ nhất để giải quyết là **photoToListItem()** phải trả về một giá trị thật bao quát:

```js
// photo-lister.js
PhotoLister = {
  photoToListItem: function(photo) {
    return (
      '<li><figure><img src="' +
      photo.url +
      '" alt=""/>' +
      "<figcaption>" +
      photo.title +
      "</figcaption></figure></li>"
    );
  },
};
```

Test thành công, là lúc để tái cấu trúc. Tôi không ưa sử dụng toán tử **+** để ghép chuỗi, nên sẽ thay thế sang dùng phương thức **join()** trên mảng:

```js
PhotoLister = {
  photoToListItem: function(photo) {
    return [
      '<li><figure><img src="',
      photo.url,
      '" alt=""/>',
      "<figcaption>",
      photo.title,
      "</figcaption></figure></li>",
    ].join("");
  },
};
```

Giờ tôi đã có một hàm để xử lí từng đối tượng photo, sẽ cần thêm một hàm để xử lí cho cả danh sách các đối tượng photo. Tôi viết như sau:

```js
describe("#photoListToHTML()", function() {
  it("should take an array of photo objects and convert them to an HTML list", function() {
    var input = [
        {
          title: "This is a test",
          url: "http://loremflickr.com/960/593",
        },
        {
          title: "This is another test",
          url: "http://loremflickr.com/960/593/puppy",
        },
      ],
      expected =
        '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>' +
        "<figcaption>This is a test</figcaption></figure></li>" +
        '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>' +
        "<figcaption>This is another test</figcaption></figure></li></ul>";
    expect(PhotoLister.photoListToHTML(input)).to.equal(expected);
  });
});
```

Tất nhiên chạy test sẽ không thành công. Tôi thêm dòng sau vào code mô-đun:

```js
photoListToHTML: function(photos) {
  return "<ul>" + photos.map(PhotoLister.photoToListItem).join("") + "</ul>";
}
```

Chú mèo vui vẻ trở lại khi chạy test. Giờ hãy tái cấu trúc code. Như trên, vì không thích nên tôi bỏ đi toán tử **+**:

```js
photoListToHTML: function(photos) {
  return [
    "<ul>",
    photos.map(PhotoLister.photoToListItem).join(""),
    "</ul>",
  ].join("");
}
```

Giờ tôi đã thực hiện được tính năng tạo một danh sách HTML được biểu diễn thông qua dạng chuỗi. Dễ nhận thấy, không như code bất đồng bộ hay code làm việc trong môi trường mạng, kiểm thử các thao tác trên chuỗi là đơn giản hơn nhiều. Bước kế tiếp, tôi sẽ sử dụng chuỗi HTML này để hiển thị lên trang.

# II. Thao tác với DOM

Một khi có được danh sách của mình, sẽ thật đảm bảo nếu tôi có thể kiểm tra liệu danh sách này đã được thêm vào trang hay chưa. Vấn đề là tôi đang làm việc hoàn toàn trong môi trường Nodejs, không hề liên quan tới trình duyệt nhé. Như đã nói, tôi chủ ý như vậy vì:

+ Quá trình kiểm thử sẽ nhanh hơn rất nhiều khi được thực thi ở command line/CMD/terminal.
+ Nó thúc đẩy tôi viết code sao cho thật linh động.
+ Để sử dụng con mèo Nyan của Mocha.

Tuy nhiên, nếu không có trình duyệt, tôi không thể sử dụng Jquery hoặc các phương thức DOM thông thường để chắc chắn mọi thứ hoạt động được. Rất may, có một mô-đun tên là [cheerio](https://cheeriojs.github.io/cheerio) giúp mô phỏng các API của jQuery, nó có những phương thức cốt lõi của jQuery để ta sử dụng. Điều đó cho phép ta có thể test các hàm thao tác với DOM mà không cần tới trình duyệt. Trước tiên, tôi cần tải về cheerio thông qua npm:

```npm install cheerio --save-dev```

Từ đây, tôi có thể sử dụng cheerio để thay thế cho jQuery:

```js
// photo-lister-spec.js
var cheerio = require("cheerio");

// ... lược bỏ ...

describe("#addPhotosToElement()", function() {
  it("should take an HTML string of list items and add them to an element with a given selector", function() {
    var $ = cheerio.load(
        '<html><head></head><body><div id="mydiv"></div></body></html>',
      ),
      list =
        '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>' +
        "<figcaption>This is a test</figcaption></figure></li>" +
        '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>' +
        "<figcaption>This is another test</figcaption></figure></li></ul>",
      selector = "#mydiv",
      $div = PhotoLister.addPhotosToElement($, selector, list);
    expect($div.find("ul").length).to.equal(1);
    expect($div.find("li").length).to.equal(2);
    expect($div.find("figure").length).to.equal(2);
    expect($div.find("img").length).to.equal(2);
    expect($div.find("figcaption").length).to.equal(2);
  });
});
```

Trên đây tôi vừa mới tạo ra một đối tượng DOM giả với chỉ một thẻ `<div>` có id là **mydiv**, rồi bao gói nó vào cheerio. Tôi đưa nó vào phương thức **addPhotosToElement()** như thể nó là jQuery. tôi muốn nó trả về một đối-tượng-giả-jQuery (🐘). Tôi sẽ chạy test để chắc chắn mỗi phần tử mình muốn đều tồn tại. Nó cho kết quả không thành công. Tôi sẽ phải viết gì đó cho phần code mô-đun:

```js
addPhotosToElement: function($, selector, list) {
    return $(selector).append(list);
}
```

🐘 Giải thích: Khi đưa jQuery vào **addPhotosToElement** qua đối số đầu tiên, nó sẽ trả về một đối-tượng-jQuery. Trong trường hợp của này, tôi dùng cheerio, nên rất logic, nó sẽ trả về một đối-tượng-cheerio, hay có thể gọi là một đối-tượng-giả-jQuery.

Bằng cách qui định **$** làm tham số, tôi sẽ nhận được một đối-tượng-giả-jQuery chỉ như chương trình được thực thi trên trình duyệt. Và việc test diễn ra thành công. Chuyển sang bước tái cấu trúc - vì không thể nghĩ ra cách nào đơn giản hơn thế này nên mọi thứ được giữ nguyên.

Đến đây, tôi đã viết xong mô-đun này. Sau đây tôi cho chương trình hoạt động được trong môi trường trình duyệt.

# III. Đẩy dữ liệu lên trang

Mọi thứ tôi thực hiện từ đầu tới giờ đang chạy trên NodeJS, không phải trên trình duyệt. Vấn đề chính là mô-đun này được tạo ra để hiển thị lên trình duyệt, chứ không chỉ đảm bảo việc test thành công. Chính vì vậy tôi cần thực hiện vài thay đổi để giúp có thể hoạt động trên cả hai môi trường.

Đây là một dạng của việc tái cấu trúc. Mỗi lần tạo ra một thay đổi, tôi sẽ chạy lại test để đảm bảo kết quả mọi thứ diễn ra suôn sẻ.

Thứ trước mắt tôi đi làm là đặt điều kiện ở dòng **module.exports** để trình duyệt không báo lỗi khi thực hiện trên trang web. Dĩ nhiên còn có một giải pháp khác là sử dụng Browserify hay Webpack để xử lí vấn đề này. Vì đây chỉ là một chương trình minh họa, tôi chỉ muốn triển khai nó trên CodePen, chứ không muốn nhúng tay vào thiết lập Webpack:

```js
// flickr-fetcher.js
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = FlickrFetcher;
}
```

```js
// photo-lister.js
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = PhotoLister;
}
```

Để chạy hết các file test, dòng sau được sử dụng:

```$ mocha --reporter=nyan ./*-spec.js```

... kết quả test vẫn thành công.

Thứ cuối cùng tôi thay đổi là thiết lập giá trị mặc định cho tham số **fetch** để khi dùng trên trình duyệt, tôi không phải đưa phương thức **jQuery.getJSON** vào mỗi lần sử dụng **fetchFlickrData**. Tôi sẽ dùng phương thức vốn có trong Javascript là [bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind):

```js
//flickr-fetcher.js
fetchFlickrData: function(apiKey, fetch) {
  if (!fetch && typeof jQuery !== "undefined") {
    fetch = jQuery.getJSON.bind(jQuery);
  }
  var url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" +
    apiKey.toString() +
    "&text=pugs&format=json&nojsoncallback=1";
  return fetch(url);
},
```

Giờ tôi có thể sử dụng các hàm này trên cả trình duyệt và cũng không cần phải đưa jQuery vào cho phương thức **fetchPhotos**. Nó làm tăng tính linh hoạt cho những mô-đun này.

Tới đây, ứng dụng gần như là hoàn thành. Phần còn lại lắp ghép hai mô-đun với nhau để hiện thị lên trang. Các bạn có thể xem [ví dụ này trên Codepen](https://codepen.io/jrsinclair/pen/EKQmwo), nó đại khái như sau:

```js
FlickrFetcher.fetchPhotos("8060d4cdac3ceb86af470aae29af3a56")
  .then(PhotoLister.photoListToHTML)
  .then(function(photosHTML) {
    PhotoLister.addPhotosToElement($, "#mydiv", photosHTML);
  });
```

Vậy là qua ba bài viết chúng ta đã tìm hiểu những vấn đề cơ bản của TDD trong Javascript, bao gồm test code bất đồng bộ, dùng stub để giải quyết vấn đề về môi trường mạng, làm việc với HTML và DOM. Cụ thể trong bài này là làm việc với HTML và sử dụng cheerio để thay thế jQuery trong môi trường Node. Dĩ nhiên còn rất nhiều điều về TDD nữa, se-ri này chỉ mới là bề nổi thôi, nhưng hi vọng các bạn sẽ cảm thấy hữu ích.