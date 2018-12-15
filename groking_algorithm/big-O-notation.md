## Thời gian thực thi(*running time*)
Mỗi khi nói về một thuật toán, bạn sẽ được nghe về thời gian thực thi. Đại khái, bạn sẽ muốn chọn thuật toán nào hiệu quả nhất -- tối ưu về thời gian và không gian nhớ.

Hãy nhớ lại giải thuật *tìm kiếm nhị phân*. Bao nhiêu thời gian mà bạn tiết kiệm được? So với cách kiểm tra mỗi phần tử, Nếu có một danh sách 100 chữ số, ta có thể mất 100 lần đoán. Nếu danh sách có 4tỉ chữ số, có thể phải mất 4 tỉ lần đoán. Số lần đoán tối đa bằng với kích thước của danh sách. Đây được gọi là *thời gian tuyến tính*(\*1).


**Lưu ý**: Thời gian ở đây không phải đơn vị giờ, phút, giây,... mà là <span style="text-decoration: underline">số lần dự đoán.</span>

Tìm kiếm nhị phân thì khác. Nếu danh sách có 100 phần tử, nó mất tối đa là 7 lần gợi ý. Nếu có 4 tỉ phần tử, sẽ mất tối đa 32 gợi ý. Ấn tượng phải ko? Tìm kiếm nhị phân chạy trong thời gian logarit (log time).

![Runtime Search](E:/repository/other/groking_algorithm/big-O/runtime_search.PNG)

## Độ phức tạp của thuật toán
<p style="line-height: 20px">Kí tự <span style="color:tomato;font-size:22px;">O</span> hoa được sử dụng để nói về tốc độ của một thuật toán. Bạn sẽ nhiều lần phải sử dụng thuật toán của người khác -- Sẽ rất thiết thực để hiểu được thuật toán đó có nhanh và chậm. Trong phần này tôi sẽ giải thích kí tự <span style="color:tomato;font-size:22px;">O</span> là gì và đưa ra thời gian thực thi của vài thuật toán phổ biến.</p>

## Thời gian thực thi của thuật toán thay đổi ở các tốc độ khác nhau
Bob đang viết một thuật toán tìm kiếm cho NASA. Thuật toán của anh ấy sẽ được sử dụng khi một tàu vũ trụ đáp xuống mặt trăng. Nó giúp tính toán địa điểm hạ cánh.

![Rocket to the moon](E:/repository/other/groking_algorithm/big-O/rocket_to_the_moon.PNG)

Bob đang lựa chọn giữa <span style="text-decoration: underline">tìm kiếm đơn thuần</span> và <span style="text-decoration: underline">tìm kiếm nhị phân</span>. Thuật toán được chọn phải vừa nhanh vừa chính xác. Một mặt, tìm kiếm nhị phân sẽ nhanh hơn. Bob chỉ mất có 10 giây để biết được nơi nào để hạ cánh. Mặt khác, tìm kiếm đơn thuần dễ dàng để viết, sẽ ít cơ hội để xuất hiện bug. Quả thật, Bob thực sự không muốn sẽ gặp bug gì trong code để đáp tên lửa! Thật cẩn thận, Bob quyết định sẽ thử nghiệm cả hai thuật toán với một danh sách 100 phần tử.

Giả sử ta sẽ hết 1ms (mili giây) để kiểm tra 1 phần tử. Với tìm kiếm đơn thuần, Bob sẽ kiểm cả cả 100 phần tử, việc tìm kiếm mất 100ms. Trong khi đó, anh ấy chỉ phải kiểm tra 7 phần tử với tìm kiếm nhị phân (log<sub>2</sub> 100 ≈ 7). Trong thực tế, danh sách sẽ có khoảng 1 tỉ phần tử. Nếu như vậy, tìm kiếm đơn thuần sẽ mất bao lâu để thực thi? Tìm kiếm nhị phần mất bao lâu? Bạn hãy tính toán để có câu trả lời trước khi đọc tiếp.

![Simple Search vs Binary Search](E:/repository/other/groking_algorithm/big-O/simple_search_vs_binary_search.PNG)

Bob sử dụng tìm kiếm nhị phân với 1 tỉ phần tử và chỉ mất 30ms(log<sub>2</sub> 1,000,000,000 ≈ 30). **"30 ms!"** anh ấy thốt lên. "Tìm kiếm nhị phân là nhanh xấp xỉ 15 lần so với tìm kiếm đơn thuần, bởi vì tìm kiếm đơn thuần với 100 phần tử hết 100ms, so với tìm kiếm nhị phân hết 7ms (100 ÷ 7 ≈ 15). Vậy tìm kiếm đơn thuần mất 30 × 15 = 450 ms đúng không?" Bob quyết định chọn tìm kiếm đơn thuần. Liệu nó có phải lựa chọn sáng suốt?

Không đúng. Bob đang mặc sai lầm. Sai lầm chết người. Thời gian thực thi cho tìm kiếm đơn thuần với 1 tỉ phần tử phải là 1 tỉ ms, xấp xỉ 11 ngày! Vấn đề là thời gian thực thi cho tìm kiếm nhị phân và tìm kiếm đơn thuần không tăng cùng 1 tốc độ.

![Growth Speed](E:/repository/other/groking_algorithm/big-O/growth_speed.PNG)

Ta thấy, khi số lượng phần tử tăng, tìm kiếm nhị phân mất thêm 1 chút thời gian. Còn tìm kiếm đơn thuần mất rất nhiều thời gian thực thi. Với số phần tử tăng càng nhiều, tìm kiếm nhị phân sẽ càng nhanh hơn rất nhiều so với tìm kiếm đơn thuần. Bob nghĩ tìm kiếm nhị phân nhanh hơn 15 lần tìm kiếm đơn thuần, nhưng điều đó không đúng. Đó là tại sao căn cứ thời gian một thuật toán mất để thực thi -- Chúng ta cần biết mối liên quan giữa thời gian thực thi với số phần tử trong danh sách. Cách đánh giá này được gọi là **Big-O**.

Cách đánh giá<span style="color:tomato;font-size:22px;">Big-O</span> cho chúng ta biết mức độ nhanh chậm của một thuật toán. Thí dụ như ta có một danh sách gồm n phần tử. Tìm kiếm đơn thuần cần kiểm tra mọi phần tử nên nó sẽ cần n lần việc kiểm tra. Thời gian thực thi dựa trên **Big-O** là *O(n)*. Big-O không nói đến tốc độ bao nhiêu giây. Big-O giúp ta so sánh số lần thực thi. Với tìm kiếm nhị phân, nó cần *log n** lần thực thi để kiếm tra. Ta nói thời gian thực thi dựa trên Big-O là O(log n).

Nhìn chung, Big-O được viết như sau

![Big-O look like](E:/repository/other/groking_algorithm/big-O/Big-O-look-like.PNG)

## Hình tượng hóa các loại thời gian thực thi Big-O
Đây là một ví dụ bạn có thể thực hiện với một tờ giấy và bút. Giả sử bạn đi vẽ 16 hình vuông.

![Paper Grid](E:/repository/other/groking_algorithm/big-O/paper-grid.PNG)

### Thuật toán 1
Một cách để thực hiện là vẽ lần lượt 16 ô vuông. Nhớ lại, Big-O đếm số lần thực thi. Trong ví dụ này, vẽ 1 ô vuông là 1 lần thực thi. Chúng ta đi vẽ 16 ô vuông. Vậy sẽ cần bao nhiêu lần thực thi nếu dùng cách này?

![Draw boxes one-by-one](E:/repository/other/groking_algorithm/big-O/draw-boxes-one-by-one.PNG)

Sẽ cần 16 lần! Vậy thời gian thực thi Big-O của thuật toán này là bao nhiêu?

### Thuật toán 2
Thử với cách gấp tờ giấy.

![Fold paper](E:/repository/other/groking_algorithm/big-O/fold-paper.PNG)

Trong ví dụ này, mỗi lần gấp được tính là một lần thực thi. Ta vừa tạo được 2 ô vuông!

Gấp tờ giấy thêm 3 lần nữa

![Fold paper more times](E:/repository/other/groking_algorithm/big-O/fold-paper-more-times.PNG)

Giờ mở tờ giấy ra sau 4 lần gấp. Kết quả ta được 16 ô vuông. Mỗi lần gấp, ta được gấp đôi số ô vuông. Ta hoàn thành chỉ với 4 lần thực thi!

![Fold operations](E:/repository/other/groking_algorithm/big-O/fold-operations.PNG)

Chúng ta "vẽ" được gấp đôi số ô vuông với mỗi lần gấp giấy. Vậy thời gian thực thi của thuật toán này là gì?

Trả lời: Thuật toán 1 mất là O(n), thuật toán 2 mất O(log n).

## Big-O thiết lập trường hợp xấu nhất
Giả sử bạn tìm tên một người trong cuốn danh bạ điện thoại sử dụng tìm kiềm đơn thuần. Chúng ta biết rằng tìm kiếm đơn thuần mất O(n). Cũng có nghĩa trong trường hợp xấu nhất, chúng ta sẽ phải tìm kiếm tất cả các tên trong cuốn danh bạ để tìm được người đó. Giả sử tên người đó ở ngay đầu tiên. Vậy thuật toán này có thời gian là O(n) hay O(1) bởi vì ta tìm ra ở đầu?

Tìm kiếm đơn thuần vẫn có thời gian O(n). Trường hợp tìm thấy phần tử ngay lần đầu được gọi là trường hợp tốt nhất. Nói tới Big-O là nói về trường hợp xấu nhất. Có thể nói ra rằng, trong trường hợp xấu nhất, ta phải kiểm tra mọi tên trong cuốn danh bạ. Vậy nên thời gian thực thi dựa trên Big-O là O(n) -- Bạn biết rằng tìm kiếm đơn thuần sẽ không bao giờ chậm hơn O(n).

Note: Cùng với thời gian thực thi trong trường hợp xấu nhất, sẽ có thời gian thực thi trong trường hợp trung bình.

## Một vài thời gian Big-O phổ biến
Đây là 5 thời gian Big-O mà bạn sẽ thấy rất nhiều, sắp xếp từ nhanh nhất tới chậm nhất:

* O(log n): cũng được biết tới là log time. VD: tìm kiếm nhị phân.

* O(n): cũng được biết tới là thời gian tuyến tính. VD: tìm kiếm đơn thuần.

* O(n * log n): một thuật toán sắp xếp nhanh VD: sắp xếp nhanh(quicksort)

* O(n<sup>2</sup>): một thuật toán sắp xếp chậm. VD: sắp xêps lựa chọn(selection sort)

* O(n!): một thuật toán thực sự chậm. VD: traveling salesperson.

Giả sử bạn đi vẽ 16 ô vuông lần nữa. Bạn có thể chọn 5 thuật toán khác nhau để thực hiện. Nếu bạn dùng thuật toán đầu tiên, nó sẽ mất O(log n) thời gian để hoàn thành. Giả sử 10 lần thực thi hết 1 giây. Với thời gian O(log n), ta sẽ thực thi 4 lần để vẽ 16 ô (log 16 = 4).  Nếu có 1,024 ô? Nó sẽ mất log 1,024 = 10 lần thực thi, hay 1 giây để vẽ.

Thuật toán 2 chậm hơn: có thời gian O(n). Nó thực hiện 16 lần để được 16 ô. Và mất 1,024 lần thực thi để được 1,024 ô. Vậy nó thực hiện việc vẽ trong thời gian bao nhiêu?

Dưới đây là thời gian sẽ mất để vẽ các ô vuông của các thuật toán trên, từ nhanh đến chậm:

![how_long_some_algorithms_take](E:/repository/other/groking_algorithm/big-O/how_long_some_algorithms_take.PNG)

Sẽ có các thời gian thực thi khác nữa, nhưng trên đây là 5 trường hợp phổ biến nhất.

Cho đến đây, chúng ta cần nắm được các vấn đề sau:

* Tốc độ của thuật toán không được đo bằng giây, mà bằng số lượng thực thi.
* Chúng ta cũng nói mức tăng của thời gian thực thi khi số lượng phần tử tăng lên. VD: mức tăng cực ít của tìm kiếm nhị phân khi số phần tử là 1 tỉ so với tìm kiếm đơn thuần.
* Thời gian thực thi của các thuật toán được biểu diễn dưới dạng Big-O.
* O(log n) nhanh hơn O(n), cũng như nhanh hơn rất nhiều khi số lượng trong danh sách tăng lên

## Thực hành
Cho biết thời gian thực thi của mỗi trường hợp sau dựa vào cách đánh giá Big-O.

1.3 Bạn có một cái tên. Giờ muốn tìm số điện thoại của người đó trong quyển danh bạ.

1.4 Bạn có một số điện thoại và muốn tìm tên người có số điện thoại trong quyển danh bạ. (Gợi ý: Chúng ta sẽ phải tìm kiếm toàn bộ cuốn sách!)

1.5 Bạn muốn đọc các số điện thoại của từng người trong cuốn danh bạ.

1.6 