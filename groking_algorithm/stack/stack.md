# Chương 5: Stack
Một **stack** được định nghĩa như là tập hợp các phần tử mà việc thêm và xóa hoạt động theo nguyên tắc "vào cuối cùng, ra đầu tiên" (last in first out - LIFO). Các phần tử thêm vào stack tại bất kì lúc nào, nhưng chỉ *phần tử thêm vào gần nhất* có thể xóa đi vào bất cứ lúc nào. Tên "stack" liên hệ từ hình ảnh một chồng đĩa. Nơi mà chức năng cơ bản của nó là "đẩy vào" và "lấy ra" từng đĩa một. Mỗi khi chúng ta cần một chiếc đĩa để đựng đồ ăn, chúng ta sẽ lấy ra cái đĩa nằm trên cùng của chồng đĩa. Sau khi đĩa được dùng xong, chúng ta cất nó lên trên cùng của chồng đĩa. Các "stacks" là một cấu trúc dữ liệu cơ bản được ứng dụng trong nhiều nơi, ví dụ như:

Example 5.1: Các trình duyệt Web lưu địa chỉ của các site vào stack. Mỗi lần người dùng đi tới một site mới, địa chỉ của site đó được đẩy vào một stack. Sau đó, người dùng có thể quay lại các site trước khi click vào nút "back". Điều này được thực hiện bằng chức năng "lấy ra" của stack.

Example 5.2: Các chương trình tạo văn bản có chức năng "undo" để quay lại trạng thái của tài liệu ở lúc trước. Điều này được thực hiện bởi việc lưu văn bản được thay đổi vào một stack.

## 5.1.1 Stack abstract data type - Stack ADT
Các stack là những cấu trúc dữ liệu đơn giản nhất, và cũng quan trọng nhất, vì chúng được dùng trong những ứng dụng. Chính thức, stack là kiểu dữ liệu trừu tượng bao gồm các chức năng sau:

* push(e): thêm phần tử e vào đầu stack.
* pop(): xóa bỏ phần tử nằm trên cùng của stack; một lỗi sẽ xảy ra nếu đó là stack rỗng.
* top(): trở lại một sự tham chiếu tới phần tử trên cùng của stack, mà không xóa bỏ nó; một lỗi sẽ xảy ra nếu đó là stack rỗng.

Thêm vào, chúng ta cũng quy định các chức năng sau:
* size(): cho biết số phần tử trong stack.
* empty(): xác định liệu stack là trống rỗng hay không.

Example 5.3: bảng sau hiển thị một chuỗi thực thi của stack.

![alt_text](E:/repository/other/groking_algorithm/stack/stack_operations.PNG)

## 5.1.2 STL Stack

Bộ thư viện "Standard Template Library"(STL) cung cấp một sự thực thi của stack. Cơ sở của việc thực thi này dựa trên *STL vector class*, nhắc tới ở section 1.5.5 và 6.1.4. Sự thực thi này cũng có tên luôn là "stack". Để sử dụng, đầu tiên phải thêm vào tập tin "stack". Sau đấy như với STL vector, lớp stack nằm trong namespace std, nên ta có thể sử dụng câu lệnh "std::stack" hoặc "using namspace std". Và ta cũng sẽ quy định xem stack có kiểu gì (template). Ví dụ để khai báo stack của các số nguyên.

```cpp
#include <stack>
using std::stack;
stack<int> myStack;
```

Chúng ta sẽ gọi kiểu của các phần tử trong một stack là kiểu của stack đó. VD: một stack chứa các số nguyên **int** thì stack đó có kiểu int. Tương tự với STL vector, STL stack cũng có thể thay đổi kích thước một cách linh động khi các phần tử mới được thêm vào.

Sau đây là các phương thức chính của stack. Với s được khai báo là một STL vector, e là một đối tượng có cùng kiểu với stack. (VD: s là một vector kiểu int, và e thuộc kiểu int)

* size(): cho biết số phần tử trong stack.
* empty(): xác định liệu stack là trống rỗng hay không.
* push(e): thêm phần tử e vào đầu stack.
* pop(): xóa bỏ phần tử nằm trên cùng của stack.
* top(): trở lại một sự tham chiếu tới phần tử trên cùng của stack.

Để ý có 1 sự khác nhau giữa STL stack và ADT stack. Trong STL stack, kết quả của một stack rỗng khi gọi *top* hay *pop* không được xác định. Cụ thể, không có exception được ném ra. Dù không có exception, kết quả có thể dẫn tới chương trình bị hủy bỏ. Chính vì vậy, nó tùy thuộc vào lập trình viên để đảm bảo không có những việc thực thi không hợp lệ như với stack rỗng như trên.

## 5.1.3 C++ Stack Interface
Trước khi nói về một sự thực thi cụ thể của stack, đầu tiên cần cân nhắc làm sao để định nghĩa một abstract data type (ADT) cho nó. Để làm được, ta cần xác định *interface* của abstract data type là gì? Interface dùng để mô tả các thuộc tính hay phương thức thuộc diện công khai - public members, mà ADT phải có. Tuy nhiên, interface cũng không phải mô tả toàn bộ tất cả các thuộc tính hay phương thức thuộc diện công khai hay cá nhân - private members. Vì vậy, bất kì sự thực thi của ADT cần có các trường được quy định trong interface.

Đoạn code dưới mô phỏng các trường cơ bản của stack ADT:

```cpp
template <typename E>                     // an interface for a stack
class Stack {
  int size() const;                       // number of items in stack
  bool empty() const;                     // is the stack empty?
  const E& top() const throw(StackEmpty); // the top element
  void push(const E& e);                  // push x onto the stack
  void pop() throw(StackEmpty);           // remove the top element
};
```
Code Fragment 5.1: Một interface không chính thức của Stack

Lớp này sử dụng template để quy định kiểu của stack cho các phần tử chứa trong nó. Ở đây, các phần tử có kiểu được đánh dầu là E. E có thể là bất kỳ kiểu cơ bản nào như int, char, bool, double, hay các lớp được viết sẵn hay do chúng ta tạo ra, hay một pointer bất kì.

Quan sát rằng các phương thức *size, empty, top* được khai báo là const. Trình biên dịch - compiler sẽ xác định rằng chúng không làm thay đổi các thuộc tính của stack. Phương thức *top* cho ta tham chiếu tới phần tử trên cùng của stack. Tuy nhiên, ta chỉ có thể đọc chứ không thay đổi nó.

Một điểm nữa, *pop* không trở lại phần tử trên cùng. Nếu muốn tham chiếu tới phần tử trên cùng, ta cần thực hiện phương thức *top*. Phương thức *push* nhận đối số là một **sự tham chiếu** tới một đối tượng kiểu E.

Một lỗi xảy ra khi phương thức pop và top được thực hiện bởi một stack rỗng. Nó sẽ ra hiệu bằng việc quăng ra một exception có kiểu StackEmpty.

```cpp
class StackEmpty : public RuntimeException {
public:
  StackEmpty(const string& err) : RuntimeException(err) {}
};
```

Code Fragment 5.2: Exception ném ra bởi pop và top khi gọi bởi một stack rỗng. Lớp này được kế thừa từ lớp RuntimeException.

## 5.1.4 Thực thi stack thông qua array.

Chúng ta có thể thực thi một stack thông qua mảng để lưu các phần tử. Trong trường hợp này, stack có một mảng S có sức chứa N, đi kèm với một biến t là chỉ mục của phần tử đầu tiên của mảng S và đồng thời cũng là phần tử trên cùng của stack.

![array_based_implemention_to_stack](E:/repository/other/groking_algorithm/stack/array_based_implemention_to_stack.PNG)

Figure 5.2: Sự thực thi của stack thông qua mảng S. Phần tử trên cùng của stack là ô S[t].

Nhớ rằng các mảng trong C++ bắt đầu tại từ chỉ mục 0, vì vậy, chúng ta sẽ khởi tạo t = -1 và giá trị của biến t dùng để xác định liệu stack có đang rỗng hay không. Tương tự, biến này cũng cho biết số phần tử đang có trong stack (bằng *t + 1*). Chúng ta cũng sẽ gặp một exception mới là StackFull, giúp báo hiệu một lỗi khi thêm mới một phần tử vào stack đã đầy. Lưu ý, exception StackFull là thuộc cho sự thực thi này, nó không được quy định ở stack ADT. Với exception này, ta đi thực thi stack ADT được mô ta dưới đây.

![pseudocode_array_based_implemention_to_stack](E:/repository/other/groking_algorithm/stack/pseudocode_array_based_implemention_to_stack.PNG)

Code Fragment 5.3: Sự thực thi của một stack thông qua mảng.
Bảng 5.1 hiển thị thời gian chạy (running times) mà các hàm trong **một stack được thực thi bởi mảng** sẽ mất. Số câu lệnh mà mỗi hàm này thực hiện là một hằng số, bao gồm các thao tác số học, các phép so sánh, phép gán. VD, để hàm size được thực hiện sẽ gồm 3 thao tác: lấy ra giá trị của t, cộng giá trị này với 1, trả về giá trị đó. Mỗi lần gọi size đều thực hiện đúng 3 thao tác này nên ta nói số thao tác này là hằng số. Vì vậy, mỗi hàm chạy trong thời gian không đổi, là O(1) *. 

* Trong khoa học máy tính, nếu một hàm thực thi có số thao tác là hằng số thì theo quy ước, nó có thời gian thực thi Big-O là O(1).

![performance_array_based_stack](E:/repository/other/groking_algorithm/stack/performance_array_based_stack.PNG)

Table 5.1: Hiệu năng của một stack được thực thi bởi mảng. Không gian sử dụng - space usage là O(N). Lưu ý, N là sức chứa của mảng còn n là số phần tử hiện tại của stack.

### a) Sự thực thi với một stack

Dựa vào phần mã giả - pseudo code trên, chúng tôi sẽ viết ra một class có tên là ArrayStack. Phương thức được sử dụng là lưu các phần tử của stack vào mảng. Để giữ code dễ hiểu, chúng tôi sẽ bỏ đi những thứ như destructor, toán tử gán, hàm sao chép constructor. Thay vào đó, để nó như một bài tập cho bạn.

```cpp
template <typename E>
class ArrayStack {
  enum { DEF_CAPACITY = 100 }; // default stack capacity
public:
    ArrayStack(int cap = DEF_CAPACITY);       // constructor from capacity
    int size() const;                         // number of items in the stack
    bool empty() const;                       // is the stack empty?
    const E& top() const throw(StackEmpty);   // get the top element
    void push(const E& e) throw(StackFull);   // push element onto stack
    void pop() throw(StackEmpty);             // pop the stack
    // ...housekeeping functions omitted
private:                                      // member data
  E* S;                                       // array of stack elements
  int capacity;                               // stack capacity
  int t;                                      // index of the top of the stack
};
```

Code Fragment 5.4: class ArrayStack thực thi Stack interface.

Trong ArrayStack, ngoài các hàm có trong Stack interface, ta sẽ thấy constructor quy định sức của stack. Giá trị mặc định DEF_CAPACITY (viết tắt của default capacity) được sử dụng nếu người dùng không thể hiện sức chứa của ArrayStack. Ta có thể viết `int cap = 100` nhưng sử dùng *enum* giúp code dễ hiểu hơn. Class của chúng ta cũng sử dụng template thể hiện kiểu dữ liệu của các phần tử trong stack được kí hiệu là E. Mảng S là một mảng cấp phát động - dynamically allocated array kiểu E.

Tiếp theo, chúng ta sẽ thực thi các hàm trong ArrayStack ở Code Fragment 5.5. Hàm Constructor sẽ cấp phát không gian mà mảng dùng để lưu phần tử của mình, kích thước của nó được thiết lập một giá trị mặc định. Các thuộc tính *capacity* và *t* cũng được thiết lập giá trị ở bước này. Mặc dù việc quy định template cho các phương thức trong C++ trông khá phức tạp về mặt ngữ pháp, việc thực thi các phương thức ở Code Fragment 5.3 sẽ vấn dễ hiểu. Quan sát hàm *top* và *pop*, đầu tiên kiểm tra liệu stack có đang trống, nếu như vậy, chúng sẽ đưa ra một exception. Tương tự, *push* đi kiểm tra stack đã đầy, nếu đầy thì nó sẽ đưa ra một exception.

```cpp
template <typename E> ArrayStack<E>::ArrayStack(int cap)
  : S(new E[cap]), capacity(cap), t(-1) {  }

template <typename E> int ArrayStack<E>::size() const 
  { return (t+1); }

template <typename E> bool ArrayStack<E>::empty() const
  { return (t<0); }

template <typename E>
const E& ArrayStack<E>::top() const throw(StackEmpty) {
  if (empty())  throw StackEmpty("Top of empty stack");
  return S[t];
}

template <typename E>
void ArrayStack<E>::push(const E &e) throw(StackFull) {
  if (size() == capacity) throw StackFull("Push to full stack");
  S[++t] = e;
}

template <typename E>
void ArrayStack<E>::pop() throw(StackEmpty) {
  if (empty())  throw StackEmpty("Pop from empty stack");
  --t;
}
```

Code Fragment 5.5: Thực thi các phương thức của class ArrayStack.

### b) Kiểm tra kết quả
Code Fragment 5.6 bên dưới thể hiện cách sử dụng class ArrayStack. Để chứng minh sự linh hoạt của ArrayStack, chúng tôi đưa ra 2 stack với kiểu khác nhau. Đối tượng A là một stack kiểu số nguyên với sức chứa mặc định là 100. Trong khi B là một stack của các chuỗi kí tự có thể lưu 10 phần tử.

```cpp
ArrayStack<int> A;                        // A = [], size = 0
A.push(7);                                // A = [7*], size = 1
A.push(13);                               // A = [7, 13*], size = 2
cout << A.top() << endl; A.pop();         // A = [7*], outputs: 13
A.push(9);                                // A = [7, 9*], size = 2
cout << A.top() << endl;                  // A = [7, 9*], outputs: 9
cout << A.top() << endl; A.pop();         // A = [7*], outputs: 9
ArrayStack<string> B(10);                 // B = [], size = 0
B.push("Bob");                            // B = [Bob*], size = 1
B.push("Alice");                          // B = [Bob, Alice*], size = 2
cout << B.top() << endl; B.pop();         // B = [Bob*], outputs: Alice
B.push("Eve");                            // B = [Bob, Eve*], size = 2
```

Code Fragment 5.6: Ví dụ khi sử dụng class ArrayStack. Nội dung của stack được hiển thị ở chú thích bên cạnh. Phần tử trên cùng được kí hiệu bởi dấu sao ("*").

ArrayStack của chúng ta còn có thể cải tiến theo nhiều cách. Ví dụ như, gọi N là kích thước khởi tạo. Chúng ta đang quy định nó với một con số cố định. Trong Code Fragment 5.4, ta chọn kích thước mặc định cho N là 100. Người dùng sau đó có thể thay đổi tới một kích thước mong muốn. Thực tế, khi sử dụng ArrayStack, một ứng dụng có thể sử dụng ít không gian hơn N, điều này dẫn tới việc lãng phí bộ nhớ. Mặt khác, ứng dụng cũng có thể cần tới nhiều không gian hơn thế.

Rất may, có nhưng sự thực thi khác có thể giải quyết giới hạn về kích thước này. Một trong số đó là sử dụng class STL stack. STL stack hoạt động dựa vào lớp STL vector, đưa ra khả năng tự động mở rộng kích thước khi stack bị đầy. Trong thực tế, STL stack là cách dễ nhất, và thông dụng nếu thực thi stack dựa vào mảng. Ở phần sau, chúng ta sẽ thấy một cách khác mà sử dụng không gian tỉ lệ với kích thước của stack.

Trong trường hợp chúng ta có khả năng ước tính số lượng phần tử sử dụng trong stack, sự thực thi stack trên cơ sở mảng khó có thể bị đánh bại bởi tốc độ và tính đơn giản. Stack đóng vai trò vô cùng quan trọng trong các ứng dụng, các sự thực thi với stack ADT, như sự thực thi sử dụng mảng ở trên sẽ có thể thực sự là có ích.

## 5.1.5 Sự thực thi của stack với một Generic Linked List

Trong phần này, chúng ta sẽ được biết tới cách thực thi stack ADT sử dụng **singly linked list**. Cách thức đưa ra là sử dụng generic singly linked list là SLinkedList được nhắc tới ở section 3.2.4. Ta sẽ tạo stack có tên là LinkedStack.

Để tránh sự hỗn độn với template class trong C++, chúng tôi sẽ không thực thi đầy đủ generic template class. Thay vào đó, quy định kiểu cho các phần tử của stack là Elem. Trong ví dụ này, Elem là kiểu string. Chúng tôi để lại việc thực thi đầy đủ generic template class như là một bài tập (Xem phầnExExercise R-5.7).

```cpp
typedef string Elem;                         // stack element type
class LinkedStack {                          // stack as a linked list
public:
  LinkedStack();                             // constructor
  int size() const;                          // number of items in the stack
  bool empty() const;                        // is the stack empty?
  const Elem& top() const throw(StackEmpty); // the top element
  void push(const Elem& e);                  // push element onto stack
  void pop() throw(StackEmpty);              // pop the stack
private:                                     // member data
  SLinkedList<Elem> S;                       // linked list of elements
  int n;                                     // number of elements
};
```

Code Fragment 5.7: Class LinkedStack, một linked list thực thi stack.

Thuộc tính chính trong class này là generic linked list S có kiểu Elem. Vì class SLinkedList không cung cấp hàm *size*, chúng ta có n để lưu kích thước hiện tại của stack.

Trong Code Fragment 5.8 bao gồm sự thực thi của các hàm constructor, size và empty. Contructor khởi tạo một linked list S và kích thước n bằng 0. Chúng tôi sẽ không đưa ra hàm destructor, thay vào đó dựa vào destructor của SLinkedList để giải phóng cho linked list S.

```cpp
LinkedStack::LinkedStack()
  : S(), n(0) { }

int LinkedStack::size() const
  { return n; }

bool LinkedStack::empty() const {
  { return n == 0; }
}
```

Code Fragment 5.8: Constructor và hàm size cho class LinkedStack.

Các thao tác khác, top, push và pop được định nghĩa ở Code Fragment 5.9. Ta cần chọn ra phần nào của list, **đầu** hay **cuối** nên chọn làm phần tử trên cùng của stack? 🤔 Vì SLinkedList có thể thêm và xóa phần tử trong thời gian cố định - constant time **chỉ tại vị trí đầu**, nên ta sẽ chọn đầu. Như vậy, hàm top trở lại `S.front()`. Hàm push sử dụng hàm addFront, trong khi hàm pop sẽ chọn hàm removeFront và cập nhật số phần tử của stack.

```cpp
const Elem& LinkedStack::top() const throw(StackEmpty) {
  if (empty())  throw StackEmpty("Top of empty stack");
  return S.front();
}

void LinkedStack::push(const Elem &e) {
  ++n;
  S.addFront(e);
}

void LinkedStack::pop() throw(StackEmpty) {
  if (empty())  throw StackEmpty("Pop from empty stack");
  --n;
  S.removeFront();

```

Code Fragment 5.9: Các thao tác chính của lớp LinkedStack.

## 5.1.6 Đảo ngược Vector

Chúng ta sẽ đi sử dụng stack để đảo ngược các phần tử trong một vector. Thuật toán này sẽ không dùng cách đệ quy để đảo ngược mảng như trong vấn đề ở Section 3.5.1. Về cơ bản, ta sẽ đẩy các phần tử của vector lần lượt vào stack, sau đó đưa các phần tử trở lại vector thông qua việc lần lượt lấy ra phần tử trên cùng của stack. Code Fragment 5.10 hiển thị mã thực thi:

```cpp
template <typename E>
void reverse(vector<E> &V) {                // đảo ngược vector
  ArrayStack<E> S(V.size());
  for (int i = 0; i < V.size(); i++)        // đẩy phần tử vào stack
    S.push(V[i]);
  for (int i = 0; i < V.size(); i++) {      // lấy ra các phần tử theo chiều ngược lại
    V[i] = S.top(); S.pop();
  }
}
```

Code Fragment 5.10: Hàm sử dụng stack để nghịch đảo vector.

VD, nếu vector có 5 chuỗi [Jack, Kate, Hurley, Jin, Michael], kết quả từ hàm reverse là vector gồm [Michael, Jin, Hurley, Kate, Jack].

## 5.1.7 Kiểm tra tính cân xứng các cặp ngoặc và thẻ HTML

Trong phần này, chúng tôi đưa ra 2 ứng dụng của stack.

### Ứng dụng a) Kiểm tra các cặp ngoặc

Các cặp kí hiệu trong toán học bao gồm:

- ngoặc tròn:  `( )`
- ngoặc xoắn:  `{ }`
- ngoặc vuông: `[ ]`
- làm tròn xuống: `⌊ ⌋`
- làm tròn lên: `⌈ ⌉`

Mỗi một kí hiệu mở phải tương ứng với kí hiệu đóng. Ví dụ, kí tự ngoặc vuông mở `[` sẽ ứng với kí tự đóng `]` như trong biểu thức sau:

- Hợp lệ: ()(()){([()])}
- Hợp lệ: ((()(()){([()])}))
- Vi phạm: )(()){([()])}
- Vi phạm: ({[])}
- Vi phạm: (

Chúng tôi sẽ để lại việc định nghĩa của việc kiểm tra các kí tự nhóm tới Excercise R-5.8.

#### Thuật toán kiểm tra tính cân bằng

Vấn đề quan trọng khi xử lí các biểu thức toán học là đảm bảo các cặp kí tự cân xứng với nhau. Chúng ta có thể sử dụng một **stack S** để kiểm tra lần lượt các kí tự từ trái-sang-phải, đảm bảo tính cân xứng trong cả biểu thức.

Giả sử cho một dãy các kí tự X = x<sub>0</sub>x<sub>1</sub>x<sub>2</sub>...x<sub>n-1</sub>. Trong đó mỗi kí tự x<sub>i</sub> có thể là kí tự ngoặc, tên biến, toán tử hoặc số. Ý tưởng để kiểm tra tính cân xứng của các kí tự ngoặc trong **S** là xử lí lần lượt các kí tự trong X. Nếu là kí tự mở, ta sẽ thêm chúng vào trong S, và nếu là kí tự đóng, ta sẽ xóa kí tự trên cùng khỏi stack (giả sử stack S không phải rỗng) và kiểm tra rằng 2 kí tự đó có cùng kiểu. Ví dụ, nếu kí tự `(` được thêm vào, nó cần tương ứng với kí tự `)`. Nếu stack rỗng sau khi chúng ta kiểm xong hết các kí tự, thì dãy X là cân xứng.

Giả xử thao tác *push* và *pop* chạy trong thời gian cố định, thì thuật toán sẽ chạy trong O(n). Bên dưới là đoạn mã mô tả thuật toán:

```python
Thuật toán ParentMatch(X, n):
  # Input: một mảng X có n kí tự, mỗi kí tự có thể là dấu ngoặc, biến, toán tử hoặc một con số 
  # Output: true nếu mọi dấu ngoặc trong X tương ứng nhau
  Cho trước S là một stack rỗng
  for i ← 0 tới n−1:
    if X[i] là dấu ngoặc mở:
      S.push(X[i])
    else if X[i] là dấu ngoặc đóng:
      if S.empty():
        return False    # stack S không tương ứng
      if S.top() không ứng với kiểu của X[i]:
        return False    # hai kí tự không ứng với nhau
  if S.empty():
    return True         # stack S là tương ứng
  else:
    return False        # stack S không tương ứng
```

Code Fragment 5.11: Thuật toán kiểm tra tính tương ứng trong một biểu thức.

### Ứng dụng b) Kiểm ta tính tương ứng của các thẻ HTML

Một ứng dụng khác là kiểm tra tính hợp lệ của file HTML. HTML là *ngôn ngữ đánh dấu siêu văn bản*, được dùng để tạo ra các trang web. Đặc trưng của file html là nội dung của nó được xác định bởi các thẻ. Các thẻ cơ bản của HTML bao gồm:

- body
- h1
- center
- p
- ol
- li

Chúng tôi sẽ hiển thị một ví dụ về file HTML và cách chúng được hiển thị ở Figure 5.3. Mục đích của chúng ta là viết một chương trình để kiểm tra rằng các thẻ html tương ứng nhau.

Một điểm khá tương đồng, cách thức ở Code Fragment 5.11 có thể được sử dụng để kiểm tra tính tương ứng của file html. Với mỗi thẻ mở sẽ được đẩy vào stack, và khi chúng ta gặp một thẻ đóng, chúng ta sẽ lấy ra thẻ trên cùng stack và xác minh liệu 2 thẻ có tương ứng với nhau.

![html_document](E:/repository/other/groking_algorithm/stack/html_document.PNG)

Figure 5.3: thẻ HTML: (a) tài liệu HTML; (b) thể hiện của tài liệu HTML

Từ Code Fragment 5.12 tới 5.14, chúng tôi đưa ra một chương trình C++ đọc nội dung của một tài liệu HTML từ standard input stream và kiểm tra xem các thẻ có tương ứng nhau hay không. Để đơn giản hóa, chúng tôi coi tất cả các thẻ không có lỗi về cú pháp.

Đầu tiên, là cách hàm *getHtmlTags* đọc từ input từng dòng một. Với mỗi dòng, ta rút ra tất cả các thẻ html, và lưu chúng vào một vector.

```cpp
vector<string> getHtmlTags() {                 // store tags in a vector
  vector<string> tags;                         // vector of html tags
  while (cin) {                                // read until end of file
    string line;
    getline(cin, line);                        // input a full line of text
    int pos = 0;                               // current scan position
    int ts = line.find("<", pos);              // possible tag start
    while (ts != string::npos) {               // repeat until end of string
      int te = line.find(">", ts+1);           // scan for tag end
      tags.push_back(line.substr(ts, te-ts+1));// append tag to the vector
      pos = te + 1;                            // advance our position
      ts = line.find("<", pos);
    }
  }
  return tags;                                 // return vector of tags 
}
```

Code Fragment 5.12: Lấy ra một vector của các thẻ html từ input, và lưu chúng trong một vector kiểu string.

Cho ví dụ ở Figure 5.3(a), hàm này sẽ cho ta vector sau:

```html
<body>, <center>, <h1>, </h1>, </center>, ..., </body>
```

Ở Code Fragment 5.12, chúng ta sử dụng biến `pos` để lưu vị trí hiện tại của input line. Chúng ta dùng hàm sẵn có của string là `find` để tìm ra nơi đầu tiên là kí tự `"<"`, cái mà ngay sau vị trí hiện thời. (Nhớ lại thảo luận về các thao tác với string từ Section 1.5.5) Vị trí của kí tự `"<"` này được lưu vào biến `ts`. Sau đó đi tìm kí tự `">"` và lưu vị trí thu được vào biến `te`. Thẻ mở bao gồm `substring` có chiều dài là `te-ts+1` bắt đầu tại vị trí `ts`. Sau đó ta dùng vector tags để lưu thẻ mở này lại. Chúng ta cập nhật vị trí hiện tại thành `te+1` và lặp lại các bước trên cho tới khi không tìm thêm được kí tự `"<"`. Điều này xảy ra khi hàm *find* trở về giá trị đặc biệt là *string::npos*.

Tiếp sau đây, chúng tôi đưa ra Code Fragment 5.12, định nghĩa hàm *isHtmlMatched* thực thi quá trình kiểm tra tính tương ứng của các thẻ.

```cpp
bool isHtmlMatched(const vector<string> &tags) {
  LinkedStack S;                                 // stack for opening tags
  typedef vector<string>::const_iterator Iter;   // const_iterator type
                                                 // iterate through vector

  for (Iter p = tags.begin(); p != tags.end(); ++p) {
    if (p->at(1) != '/')                         // opening tag?
      S.push(*p);                                // push it on the stack
    else {//else must be closing tag
      if (S.empty())  return false;              // nothing to match - failure
      string open = S.top().substr(1);//opening tag excluding '<'
      string close = p->substr(2);//closing tag excluding '</'
      if (open.compare(close) != 0) return false;// fail to match
      else  S.pop();                             // pop matched element
    }
  }
  if (S.empty())  return true;                   // eveything matched - good
  else return false;                             // some unmatched - bad
}
```

Code Fragment 5.13: Kiểm tra liệu các thẻ html lưu trong vector có là tương ứng.

Chúng ta tạo ra một stack S, dùng để lưu các thẻ mở. Sau đó chúng ta sẽ lặp qua các thẻ trong vector. Nếu kí tự thứ 2 của thẻ không phải là `"/"`, thì nó là một thẻ mở, và được đẩy vào trong stack. Mặt khác, nó là một thẻ đóng, chúng ta sẽ kiểm tra xem nó có tương ứng với thẻ trên cùng của stack. Để so sánh các thẻ mở và thẻ đóng, chúng ta sử dụng hàm `substr` để bỏ đi kí tự `"<"` của thẻ mở và kí tự `"</"` của thẻ đóng. Sau đó kiểm tra xem 2 string thu được có bằng nhau. Khi việc lặp của vector kết thúc, chúng ta sẽ biết được mỗi thẻ đóng có tương ứng với thẻ mở. Để thực hiện được, chúng ta cần kiểm tra rằng không có thẻ mở nào mà không ứng với thẻ đóng. Thông qua xác định rằng stack là rỗng.

Cuối cùng, hàm main được đưa ra ở Code Fragment 5.14. Nó sẽ gọi hàm getHtmlTags để thu các thẻ, rồi chuyền tới isHtmlMatched để thực hiện việc kiểm tra.

```cpp
int main(int argc, char const *argv[]) {
  // kí tự EOL trong windows là Ctrl-Z Enter
  // kí tự EOL trong linux/unix là Ctrl-D
  // kết thúc việc điền nội dung html. Ta sẽ cần xuống dòng và gõ tổ hợp phím EOL
  cout << "Enter html content: " << endl;
  if (isHtmlMatched(getHtmlTags()))
    cout << "The input file is a matched HTML document." << endl;
  else
    cout << "The input file is not a matched HTML document." << endl;

  return 0;
}
```

Code Fragment 5.14: Hàm main để kiểm tra liệu các thẻ html có tương ứng nhau.