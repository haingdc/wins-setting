#5.2 Queue

Queue là một trong các cấu trúc dữ liệu cơ bản, khá gần với Stack. Một queue là một tập hợp các phần tử được thêm vào và xóa đi theo quy tắc *vào đầu tiên, ra đầu tiên* - first-in first-out(FIFO). Các phần tử có thể được thêm vào một queue vào bất cứ thời điểm nào và chỉ có phần tử ở trong queue lâu nhất có thể xóa bỏ ngay tức thì. Chúng ta hay nói rằng các phần tử được thêm vào queue ở cuối hàng, xóa bỏ tại đầu hàng. Hình ảnh liên tưởng cho queue là một nhóm người đang xếp hàng mua vé. Để có được vé, người vào sẽ đứng vào từ cuối hàng và mua vé từ đầu của hàng.

#5.2.1 Queue Abstract Data Type

Queue abstract data type được định nghĩa như là một đối tượng để quản lý nhóm các phần tử tuần tự nhau. Việc sử dụng hay xóa bỏ các phần tử này bị giới hạn tới phần tử đầu tiên của hàng. Mặt khác, việc thêm mới bị giới hạn tới phần tử cuối của hàng. Việc giới hạn này dẫn tới quy tắc FIFO ở trên.

Queue abstract data type (ADT) hỗ trợ các thao tác sau:
* enqueue(e): Thêm mới phần tử e vào cuối hàng.
* dequeue(): Xóa bỏ phần tử ở đầu hàng; một lỗi xảy ra nếu không có phần tử nào trong queue.
* front(): cho ta phần tử đầu hàng, không xóa ; một lỗi xảy ra nếu không có phần tử nào trong queue.
* size(): cho ta biết số phần tử trong queue.
* empty(): cho ta biết nếu phần tử là rỗng hay không.

Example 5.4: Bảng sau hiển thị các thao tác với một queue Q chứa các số nguyên.

![queue_operations](E:/repository/other/groking_algorithm/queue/queue_operations.PNG)

#5.2.2 STL Queue
Standard Template Library quy định một sự thực thi của một queue. Như với STL Stack, Sự thực thi này sử dụng STL vector class (Section 1.5.5 và 6.1.4). 

VD khai báo một queue của các số float.

```cpp
#include <queue>
using std::queue;
queue<float> myQueue;  // hay std::queue<float> myQueue;
```

Như vậy, để khai báo một đối tượng có kiểu queue, đầu tiên ta sẽ thêm vào tập tin định nghĩa có tên của queue. Tiếp theo, do queue là một phần của std namespace, ta sẽ sử dụng "std::queue" hay câu lệnh *using*. Tiếp theo quy định kiểu cho các phần tử trong queue. 

Giống như với các đối tượng của STL vector và stack, một STL queue có thể thay đổi kích thước của nó khi có các phần tử được thêm vào.

STL queue cung cấp các thao tác cơ bản chung ở ADT queue, nhưng cú pháp hay ý nghĩa có sự khác nhau nhỏ. Bên dưới, là danh sách các chức năng cơ bản. q được khai báo là một STL queue, e biểu thị một phần tử có cùng kiểu với queue. (VD q là một queue của các số float, e sẽ là kiểu float).

* size(): cho ta biết số phần tử trong queue.
* empty(): cho ta biết nếu phần tử là rỗng hay không.
* push(e): Thêm mới phần tử e vào cuối hàng.
* pop(): Xóa bỏ phần tử ở đầu hàng.
* front(): cho ta phần tử đầu hàng.
* back(): cho ta phần tử cuối hàng.

Không như ADT queue, STL queue cho phép truy xuất cả đầu và cuối của queue. Tương tự như STL stack, Có thể nói kết quả khi thực hiện các các chức năng như front, back, pop đối với một STL queue rỗng là không xác định bởi vì không có exception nào được đưa ra. Kết quả thường là chương trình bị hủy bỏ. Nó tùy thuộc vào lập trình viên để đảm bảo xử lí những trường hợp không hợp lệ khi sử dụng queue như trên.

#5.2.3 Queue Interface - Thao tác bắt buộc gắn với queue
Các thao tác cho ADT queue hiển thị ở Code Fragment 5.15. Giống với ADT stack, lớp này sử dụng template, kiểu của các phần tử E do người dùng quy định.

```cpp
template <typename E>
class Queue {
public:
  int size() const;
  bool empty() const;
  const E& front() const throw(QueueEmpty);
  void enqueue (const E& e);
  void dequeue() throw(QueueEmpty);
};
```

Code Fragment 5.15: Thao tác gắn với Queue.

Ta thấy rằng size và empty là giống với ADT Stack. Bên cạnh đó là front, ta gọi các hàm này là các hàm truy xuất, chúng trở lại một giá trị và không làm thay đổi nội dung của cấu trúc dữ liệu. Ngoài ra ta còn nhận thấy QueueEmpty exception được đưa ra biểu thị lỗi trên một queue rỗng.

Các hàm size, empty, front đều sử dụng *const*, để thông báo rằng với trình biên dịch, chúng không thay đổi nội dung của queue. Lưu ý hàm front trả về một hằng tham chiếu tới đầu hàng.

Một lỗi QueueEmpty xảy ra khi hàm front hay dequeue được gọi trên một queue rỗng. QueueEmpty exception được định nghĩa như sau:

```cpp
class QueueEmpty : public RuntimeException {
public:
  QueueEmpty(const string& err) : RuntimeException(err) { }
};
```

Code Fragment 5.16: Exception đưa ra khi front và dequeue được gọi trên một queue rỗng. Lớp này được mở rộng từ lớp RuntimeException ở Section 2.4.

#5.2.4 Thực thi Queue sử dụng mảng

Chúng ta sẽ đi thực thi một queue ở dạng đơn giản dựa trên một mảng Q, với sức chứa N. Vấn đề chính với việc thực thi này là lựa chọn cách để truy xuất được đầu và cuối của queue.

Một cách đó là phỏng theo cách chúng ta sử dụng khi đi thực thi stack. Cụ thể, để Q[0] là đầu của queue và ☠☠☠☠☠☠☠☠☠☠

## Sử dụng một mảng trong một vòng tròn
Để tránh di chuyển các đối tượng một khi chúng đã nằm trong Q, chúng ta định nghĩa 3 biến **f, r, n**:

* f là chỉ mục để lưu phần tử đứng đầu của queue. Nếu queue không phải queue rỗng, đây là chỉ mục của phần tử để xóa bởi hàm dequeue.
* r là chỉ mục nằm ngay sau đuôi của queue. Nếu queue chưa đầy, đây là chỉ mục để một phần tử mới được thêm vào bởi hàm enqueue.
* n là số phần tử hiện tại của queue.

Ban đầu, chúng ta thiết lập n = 0 và f = r = 0, thể hiện queue rỗng. Khi xóa một phần tử đứng đầu queue, ta sẽ giảm n và tăng f tới vị trí kế tiếp trong Q. Tương tự, khi thêm mới, chúng ta tăng r và tăng n. Điều này cho phép ta thực hiện hàm enqueue và dequeue ngay tức thì.

Tuy nhiên, vẫn có một vấn đề với cách này. Cân nhắc xem sẽ ra sao nếu chúng ta thực hiện enqueue và dequeue một phần tử N lần khác nhau. Kết quả là f = r = N. Nếu chúng ta đưa mới phần tử thêm một lần nữa, lỗi tràn mảng sẽ được đưa ra, thậm chí queue còn có thể chứa được nhiều phần tử. Để tránh vấn đề này, chúng ta sẽ thay đổi chỉ mục f và r khi chúng trỏ tới cuối của Q. Hãy hình dung Q như một mảng vòng tròn - **circular array** có chỉ mục từ Q[0] tới Q[N - 1] và sau Q[N - 1] thì quay trở lại Q[0]

![circular_array_Q](E:/repository/other/groking_algorithm/queue/circular_array_Q.PNG)