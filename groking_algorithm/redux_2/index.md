Redux hoạt động ra sao? thông qua chương trình đếm số

Trong quá trình tìm hiểu về React và tiếp xúc với Redux, tôi vẫn cảm thấy mơ hồ những khái niệm như *action, reducer, action creator, middleware, pure function, immutability*...

Đa phần những thuật ngữ trên khá mới mẻ.

Vì vậy trong bài viết này, chúng ta sẽ đi làm rõ *cách* Redux hoạt động theo từng bước trước sau mà tôi nghĩ có thể giúp bạn hiểu được. Ở [bài viết trước](https://medium.com/@vnknowledge/redux-l%C3%A0-g%C3%AC-khi-n%C3%A0o-n%C3%AAn-d%C3%B9ng-n%C3%B3-7453f7204169), tôi đã thử giải thích về Redux thông qua những khái niệm đơn giản. Nếu bạn chưa nắm được mục đích mà Redux giải quyết, tại sao nên sử dụng nó, bạn nên đọc nó trước, rồi tiếp tục với bài viết này.

# Phần thứ nhất: Trạng thái của React

Chúng ta sẽ bắt đầu trước qua một ví dụ về trang thái trong chương trình React và sau đó từng bước một tiếp cận với Redux.

Ví dụ đếm số:

![counter-plain](E:/repository/other/groking_algorithm/redux_2/counter-plain@2x.png)

Dưới đây là code (để đơn giản tôi sẽ bỏ qua phần thay đổi CSS nên giao diện sẽ không như trong hình):

```jsx
import React from 'react';

class Counter extends React.Component {
  state = { count: 0 }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  }

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.state.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

export default Counter;
```

Ta có thể rút ra vài đánh giá:

- Trạng thái **count** được lưu ở thành phần **Counter**.
- Khi người dùng click vào nút “+”, phần xử lí sự kiện  **onClick** sẽ gọi tới hàm **increment** của **Counter**.
- Hàm **increment** sẽ cập nhật trạng thái count.
- Khi trạng thái thay đổi, React sẽ gọi hàm **render** của **Counter** để cập nhật lại giao diện. Kết quả, giá trị mới của counter sẽ được hiển thị.

## Cài đặt

Bước thứ nhất, chúng ta cùng đi tạo một project:

  - Cài **create-react-app** trong trường hợp máy bạn chưa có (**npm install -g create-react-app**). Để xây dựng một chương trình sử dụng react đòi hỏi các ông cụ đi kèm như webpack, babel, jest,... create-react-app sẽ chuẩn bị sẵn những cái đó để ta có thể bắt đầu nhanh project của mình.
  - Tạo project: **create-react-app redux-intro**
  - Thay thế file **src/index.js** như sau:

    ```jsx
    import React from 'react';
    import { render } from 'react-dom';
    import Counter from './Counter';

    const App = () => (
      <div>
        <Counter />
      </div>
    );

    render(<App />, document.getElementById('root'));
    ```

- Tạo mới file **src/Counter.js** có nội dung từ Counter ở trên đầu.

Cuối cùng, chạy chương trình:

```terminal
$ yarn start
```

![without-redux](E:/repository/other/groking_algorithm/redux_2/without-redux.png)

# Thêm vào Redux

Như đã nói ở [bài trước](https://medium.com/@vnknowledge/redux-l%C3%A0-g%C3%AC-khi-n%C3%A0o-n%C3%AAn-d%C3%B9ng-n%C3%B3-7453f7204169), Redux đặt **trạng thái** - state của ứng dụng vào chỉ một **kho lưu trữ** - single store. Sau đó, bạn có thể lấy ra dữ liệu nằm trong kho và đưa vào các thành phần của React thông qua property. Điều này giúp lưu trữ dữ liệu trong một nơi (kho chứa) và cung cấp nó **trực tiếp** tới bất kì một component, mà không đòi hỏi dữ liệu phải được truyền xuống các component trung gian.

Làm theo các bước bên dưới sẽ giúp bạn hiểu được quá trình hoạt động của chương trình. Bạn sẽ gặp vài lỗi trong quá trình viết code, sau đó tìm hướng xử lí vấn đề.

Trước hết thêm Redux vào project **yarn add redux react-redux** hoặc **npm install redux react-redux --save**

## redux vs react-redux

> Bạn có thể để ý sao lại cần tới 2 thư viện? react-redux là gì?

Redux giúp tạo kho lưu trữ để lưu trạng thái, lấy ra trạng thái khi có yêu cầu hay thực hiện các thao tác khi trạng thái thay đổi. Nhưng đó là tất cả thứ nó làm, **redux** không hề biết tới **react**. Bởi vậy, "react-redux" đóng vai trò cầu nối cho phép tạo liên kết giữa kho lưu trữ với những component của React.

Có thể nói hai thư viện này luôn song hành cùng nhau khi phát triển ứng dụng react sử dụng redux.

## Đi thực hiện từng bước nhỏ

Đa phần các bài hướng dẫn sẽ làm những việc như tạo kho lưu trữ, thiết lập Redux, viết một reducer, ... gộp chung lại khiến người đọc khó nắm bắt được quá trình.

Tôi sẽ chia cả quá trình đó ra từng bước nhỏ, nhằm giúp bạn hiểu rõ hơn động cơ đằng sau mỗi bước.

Quay lại chương trình Counter, hãy hình dung làm sao để ta dời trạng thái của component vào trong Redux.

Trước hết chúng ta cần xóa bỏ trạng thái của component:

```jsx
import React from 'react';

class Counter extends React.Component {
  increment = () => {
    // fill in later
  }

  decrement = () => {
    // fill in later
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

export default Counter;
```

## Thiết lập sự kết nối cho Counter

Để ý rằng **{this.state.count}** đã đổi thành **{this.props.count}**. Chương trình sẽ gặp vấn đề bởi **Counter** không nhận bất kì thuộc tính **count** nào.

Để thu được giá trị của count từ Redux, ở đầu file **src/Counter.js** ta thêm vào hàm connect:

```jsx
import { connect } from 'react-redux';
```

Ở cuối file, ta quy định sư liên kết giữa Counter với Redux:

```jsx
// thêm hàm này:
function mapStateToProps(state) {
  return {
    count: state.count
  };
}

// Thay thế dòng này:
// export default Counter;

// bởi dòng này:
export default connect(mapStateToProps)(Counter);
```

Chương trình sẽ ngay lập tức gặp lỗi.

Nhớ lại trước đó, chúng ta chỉ đơn thuần đưa ra Counter. Còn bây giờ, ta bao nó vào trong khi gọi hàm **connect**.

### connect là gì?

> ❓❓❓ Bạn có thể thấy việc gọi "thằng" connect trông khá lạ. Vì sao phải viết **connect(mapStateToProps)(Counter)** mà không phải **connect(mapStateToProps, Counter)** hay **connect(Counter, mapStateToProps)**? Nó đóng vai trò gì?

- 💡 Ta phải viết như vậy bởi **connect** là một hàm **higher-order**. Theo định nghĩa, Higher-order là hàm *nhận đối số là những hàm khác* hoặc *thực thi nó cho kết quả là một hàm*. Vì vậy khi gọi **connect()**, ta sẽ nhận được một hàm, đưa một component vào hàm này, kết quả ta thu được một component mới.

*connect* sẽ kết nối với Redux, lấy ra dữ liệu và truyền nó vào trong **mapStateToProps** mà ta viết ra. Hàm **mapStateToProps** như tên gọi của nó, có vai trò liên kết giữa state của Redux với các property của component.

Kết quả mà **mapStateToProps** trả về là một đối tượng. Component có thể lấy dữ liệu từ đối tượng này thông qua prop. Như trong ví dụ, Counter sẽ dùng **this.props.count** để lấy ra số đếm.

Thực hiện các bước trên ở máy của mình, bạn sẽ gặp lỗi trên console:

> Could not find “store” in either the context or props of “Connect(Counter)”. Either wrap the root component in a , or explicitly pass "store" as a prop to "Connect(Counter)".*

Nguyên nhân là bởi **connect** sẽ lấy dữ liệu từ kho lưu trữ tạo bởi Redux. Tuy nhiên, vì ta chưa có kho lưu trữ nào cả nên lỗi này là hoàn toàn logic.

## Cung cấp kho lưu trữ

Redux chứa trạng thái của cả chương trình. Khi đặt toàn bộ chương trình vào thành phần **Provider**, sau đó mọi thành phần có thể sử dụng hàm **connect** để kết nối tới kho lưu trữ.

Điều đó có nghĩa các thành phần trong hệ thống cây bao gồm App, các thành phần con cháu,... - có thể truy xuất tới kho lưu trữ, với điều kiện, chúng được truyền vào khi gọi *connect*.

Lưu ý: Không nên đặt mọi component vào hàm **connect** bởi như vậy làm giảm tốc độ của chương trình 🐌.. và làm cho thiết kết của chương trình trông rất lộn xộn.

Thành phần **Provider** dường như rất "hoàn hảo". Thực chất bên dưới, nó sử dụng tính năng “context” của react.

Điều này trông như một lối đi bí mật liên kết tới mọi component, **connect** "mở toang" cánh cửa tới lối đi đó.

Tưởng tượng về một chồng bánh trước mặt. Ta sẽ rót siro lên đó. Từ từ mọi chiếc bánh sẽ được phủ lên một lớp vàng óng ánh dù bạn chỉ đổ cho chiếc trên cùng. **Provider** cũng đóng vai trò như vậy với Redux.

![pouring_syrup_on_a_pile_of_pancakes](E:/repository/other/groking_algorithm/redux_2/pouring_syrup_on_a_pile_of_pancakes_2.jpg)

Ở file **src/index.js**, đưa nội dung của **App** vào bên trong **Provider**:

```jsx
import { Provider } from 'react-redux';

// ...

const App = () => (
  <Provider>
    <Counter/>
  </Provider>
);
```

Lúc này lỗi trên vẫn chưa được giải quyết - bởi vì **Provider** cần làm việc với một kho lưu trữ.

## Tạo kho lưu trữ

Redux cung cấp hàm **createStore** để tạo kho lưu trữ. Hãy tạo một kho chưa và truyền nó tới Provider:

```jsx
import { createStore } from 'redux';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
);
```

Ta sẽ gặp một lỗi mới:

> Expected the reducer to be a function.

Có thể thấy Redux hành xử không linh động lắm đâu. Bằng việc tạo được một kho lưu trữ, sao nó không cho trước một giá trị mặc định lưu ở kho chứa, chả hạn như một đối tượng rỗng?

\- Nhưng không: Redux không biết gì về trạng thái của chương trình sẽ trông ra sao. Công việc đó là giành cho bạn! Nó có thể là một đối tượng, hay một con số, một chuỗi,.. bất kì thứ gì ta muốn. Như vậy, chúng ta phải viết ra một hàm cho đầu ra là trạng thái. Hàm này được gọi là **reducer**. Chúng ta đi tạo một cái trước, rồi đưa nó vào trong **createStore**:

```jsx
function reducer() {
  // cứ để trống ở đây
  // nó ngầm định trở lại undefined
  // , tương tự như câu lệnh `return undefined;`
}

const store = createStore(reducer);
```

## Reducer lúc nào cũng nên trở lại một cái gì đó

Giờ ta sẽ gặp phải lỗi:

> Cannot read property ‘count’ of undefined

Chương trình không hoạt động bởi chúng ta đang thử truy xuất tới **state.count**, nhưng hiện tại **state** là undefined. Redux yêu cầu **reducer** trở lại một giá trị của **state**. Thực tế nó đang ngầm định trả về **undefined**.

Reducer tạo ra với mục đích nhận vào trạng thái hiện tại và trở lại trạng thái mới.

Trước hết hãy quy định cho reducer trở lại một giá trị có định dạng chúng ta cần: một đối tượng có thuộc tính **count**:

```jsx
function reducer() {
  return {
    count: 42
  };
}
```

Vậy là cuối cùng chương đã hoạt động. Số đếm được hiển thị lên là “42”.

Chỉ có điều: số đếm bị "kẹt" ở 42.

## Tổng kết lại tới bây giờ

Cùng nhìn lại những thứ chúng ta thực hiện được:

- Chúng ta viết hàm **mapStateToProps** nhằm thu được phần dữ liệu mong muốn từ kho lưu trữ của Redux.

- Chúng ta kết nối kho lưu trữ Redux tới thành phần **Counter**, thông qua hàm **connect** của **react-redux**. Tạo hàm **mapStateToProps** để quy định cách mà việc kết nối xảy ra.

- Chúng ta tạo ra hàm **reducer** để nói cho Redux biết định dạng của trạng thái - nó lên trông như thế nào.

- Chúng ta sử dụng hàm **createStore** của **redux** để tạo một kho lưu trữ, và truyền cho nó hàm **reducer**.

- Chúng ta đặt toàn bộ chương trình vào trong thành phần **Provider** của **react-redux**, và cung cấp cho nó thuốc tính là kho lưu trữ vừa tạo được.

- Chương trình cuối cùng cũng hoạt động, trừ việc số đếm mãi mãi là 42.

## Khởi tạo trạng thái

Chúng ta sẽ thực hiện cách để bảo Redux thay đổi số đếm.

Nhớ lại hàm reducer phía trên. Tôi đã nhắc đến việc nó nhận *trạng thái hiện tại* và trả về *trạng thái mới*. Thực ra điều đó là không thiếu sót. Sự thực là nó nhận *trạng thái hiện tại* và một *hành động*, sau đó trả về *trạng thái mới*. Reducer nên trông như sau:

```jsx
function reducer(state, action) {
  return {
    count: 42
  };
}
```

Vào lần đầu tiên Redux gọi reducer, nó sẽ truyền vào `state` giá trị undefined. Nên đây là lúc thích hợp để thiết lập cho trạng thái một cái giá trị ban đầu. Trong trường hợp này, giá trị khởi tạo là một đối tượng có thuộc tính **count** bằng 0.

Ta sẽ sử dụng tính năng "giá trị mặc định của đối số" - default argument của ES6 để thể hiện giá trị ban đầu cho **state**.

```jsx
const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  return state;
}
```

Kiểm tra lại, ta thấy chương trình vẫn hoạt động, tuy nhiên giờ số đếm kẹt ở 0 thay vì 42.

## Hành động

Trong phần này, chúng ta sẽ tìm hiểu tham số **action** là gì? nó tới từ đâu? Làm cách nào sử dụng nó để thay đổi số đếm?

Một "hành động" là một đối tượng có vai trò mô tả một sự thay đổi mà chúng ta tạo ra. Nó có một thuộc tính bắt buộc là **type**:

```jsx

{
  type: "INCREMENT"
}

// hay

{
  type: "DECREMENT"
}
```

## Trả lời các hành động

Nhớ lại rằng công việc của reducer là nhận **trạng thái hiện tại** và một **hành động**, rồi đưa ra **trạng thái mới**. Khi reducer nhật một hành động là **{ type: "INCREMENT" }**, bạn sẽ mong nó trả lại trạng thái mới là gì?

Đương nhiên là tăng giá trị của số đếm lên:

```js
function reducer(state = initialState, action) {
  if(action.type === "INCREMENT") {
    return {
      count: state.count + 1
    };
  }

  return state;
}
```

Ta có thể sử dụng câu lệnh **switch - case** cho mỗi một hành động. Thay đổi reducer như sau:

```js
function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}
```

### Luôn trở lại một trạng thái

Chú ý luôn đặt câu lệnh **return state** của cuối hàm reducer. Bởi vì Redux có thể đưa vào reducer các hành động mà nó không biết là gì. Ví dụ như hành động đầu tiên mà bạn nhận được là **{ type: "@@redux/INIT" }**. Ta sẽ thấy khi đưa **console.log(action)** vào trước câu lệnh **switch**.

Bên cạnh đó, reducer sẽ phải trở lại *trạng thái mới*, kể cả khi không có sự thay đổi gì so với trạng thái *hiện tại*. Bạn chắc chắn không muốn gặp tình cảnh “đang có trạng thái” đi tới “state = undefined” phải không? Để tránh điều đó, ta chú ý trả về cho **reducer** một giá trị mặc định.

### Không bao giờ trực tiếp thay đổi trạng thái

Một thứ mà các bạn không bao giờ làm là trực tiếp thay đổi - mutate trạng thái. Trạng thái phải được coi như không thể thay đổi - immutable. Bạn không thể làm như sau:

```js
function brokenReducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      // 💀 trạng thái bị thay đổi!
      state.count++;
      return state;

    case 'DECREMENT':
      // 💀 trạng thái bị thay đổi!
      state.count--;
      return state;

    default:
      // 👍 Ok
      return state;
  }
}
```

Bạn cũng không được làm các thứ như **state.foo = 7**, hay **state.items.push(newItem)** hay **delete state.something**. Thay vào đó thứ bạn nên làm là **return { ... }**.

### Tổng hợp các quy tắc

Luôn trở lại một trạng thái, không bao giờ trực tiếp thay đổi trạng thái, không "connect" vào tất cả các thành phần, *ăn nhiều rau*, *không ra ngoài sau 11h*,... 😁 Ta bị nhồi nhét nhiều luật lệ và dễ dẫn đến phát nản.

Redux giống như những phụ huynh khó tính. Những nó đến từ một triết lí - Lập trình hàm/Functional programming.

Bạn đã bao giờ sử dụng một đối tượng toàn cục và truy suất nó ở nhiều nơi trong ứng dụng? Lúc đầu nó có thể không vấn đề gì. Ngắn gọn và dễ dàng. Rồi sau đó, nhiều nơi cùng thay đổi trạng thái 1 lúc, trạng thái bị biến đối theo cách không mong muốn, chúng ta phải bỏ thêm thời gian đi 'fix code', mất thời gian đi coffee ☕.

Redux tránh được nhiều vấn đề như vậy với các quy tắc vô cùng đơn giản. Trạng thái là read-only, các hành động động là cách duy nhất để cập nhật trạng thái. Những sự thay đổi chỉ xảy ra 1 chiều: action -> reducer -> new state. Hàm reducer phải được giữ "sạch" - không làm thay đổi đối số.

## Các hành động tới từ đâu?

Hiện tại chương trình chưa có khả năng tăng và giảm số đếm. Để thực hiện, sẽ cần một cách để đưa các hành động vào trong reducer.

Các hành động được gửi đi thông qua một hàm tên là **dispatch**.

> Làm sao để có được hàm dispatch?

Kho lưu trữ sở hữu hàm **dispatch**. Bạn có thể gọi **store.dispatch(someAction)**. Tuy nhiên điều này đem tới sự bất tiện do kho lưu trữ chỉ có mặt ở 1 file.

May mắn ta có hàm **connect** giúp. Ngoài việc đưa kết quả của hàm **mapStateToProps** vào bên trong các component thông qua **props**, connect cũng "âm thầm" đưa thêm hàm **dispatch**.

Tới đây, bạn chỉ cần thay đổi cách thực thi của hàm **increment** và **decrement**. Chúng ta sẽ gọi phương thức **dispatch**, truyền vào nó một hành động:

```jsx
import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  }

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span>{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

export default connect(mapStateToProps)(Counter);
```

Mã nguồn của chương trình được lưu trên [Github](https://github.com/dceddia/redux-intro).

## Lời kết

Với việc thực hiện một chương trình đếm số, bạn có thể tiếp tục tìm hiểu thêm về Redux.

Rất nhiều thứ mà trong bài viết không đề cập - kết hợp nhiều reducer, action constant, action creator, middleware, thunk, asynchronous call, selector,... Xem tại [website của Redux](https://redux.js.org) để biết thêm.

Hi vọng bạn đã nắm bắt được ý tưởng cơ bản của Redux là gì? reducer là gì? hành động là gì? Cách Redux luân chuyển dữ liệu (dispatch(action) -> reducer -> new state -> re-render).

Bài viết được dịch và có sửa đổi từ nguồn [how does redux work](https://daveceddia.com/how-does-redux-work/)

