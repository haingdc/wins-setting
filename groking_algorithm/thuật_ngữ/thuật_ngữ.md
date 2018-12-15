#1 container

Cuốn **The C++ Programming Language** trang 95

Đa phần việc tính toán dựa trên việc tạo ra một hay nhiều nhóm của những giá trị và thao tác với các nhóm đó. Ví dụ, một chuỗi "abcde" là một nhóm, trong đó các giá trị sẽ là những kí tự **a, b, c, d, e**. Thao tác với chuỗi có thể là hiển thị chuỗi, cắt chuỗi, ghép các chuỗi,... Một class với mục đích chính là quản lí các đối tượng thì được gọi là một *container*. (💡 string được xem là một loại container). Việc cung cấp các container phù hợp với từng nhiệm vụ và đưa ra các thao tác có tính hữu ích là các bước quan trọng cho chúng ta, để có thể xây dựng bất kì một chương trình.

#2 sequence

Một sequence - *dãy/nhóm các phần tử tuần tự nhau* được biểu diễn bởi một cặp iterator bao gồm phần tử đầu tiên và một phần tử tưởng tượng ngay sau phần tử cuối cùng.

![sequence](E:/repository/other/groking_algorithm/thuật_ngữ/sequence.PNG)

VD, nếu muốn sắp xếp tất cả các phần tử trong một vector, ta làm như sau:

```cpp
sort(vec.begin(),vec.end());
```

Hàm sort() sẽ sắp xếp dãy các phần tử của vector có phạm vi được xác định bởi cặp iterator là <span style="color:aqua">vec.begin()</span>  và <span style="color:aqua">vec.end()</span>

