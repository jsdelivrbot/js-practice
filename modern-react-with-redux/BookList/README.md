# README

> [Starter Kit from ...](https://github.com/StephenGrider/ReduxSimpleStarter)

> [course from ...](https://www.udemy.com/react-redux/)

## Note

1. `redux`负责数据层的内容，存储`state`；`react`负责视图层的内容，将`state`转化为呈现在页面上的`view`

2. `Reducer`是一个纯函数，用来接收`action`，算出新的`state`。

   在这里需要两个`reducer`，一个负责创建全部的书籍列表，一个负责选中的书籍。

   首先创建`reducer_list.js`，它不需要接受`action`，仅仅是一个成员是对象的数组，用来存放列表中的书籍信息。

   ```js
   export default function () {
     return [
       { title: 'Javascript: The Good Parts' },
       { title: 'Harry Potter' },
       { title: 'The Dark Tower' },
       { title: 'Eloquent Ruby' }
     ];
   }
   ```

   然后在总的`reducer`中引用它

   ```js
   import { combineReducers } from 'redux';

   import booksReducer from './reducer_books';

   const rootReducer = combineReducers({
     books: booksReducer
   });

   export default rootReducer;
   ```

3. 有了`reducer`，然后需要把它转换（？）到页面上。创建`book-list.js`。注意，它需要与`redux`层中的数据交互，因此是一个 container 而不是 component 

   ```js
   import React, { Component } from 'react';
   import { connect } from 'react-redux';

   class BookList extends Component {
     renderBooks() {
       return this.props.books.map((book) => {
         return (
           <li
             key={book.title}
             className="list-group-item">
             {book.title}
           </li>
         )
       });
     }

     render() {
       return (
         <ul className="list-group col-sm-4">
           {this.renderBooks()}
         </ul>
       );
     }
   }

   function mapStateToProps(state) {
     // Whatever is returned will show up as props inside of BookList
     return {
       books: state.books
     }
   }

   export default connect(mapStateToProps)(BookList);
   ```

   可以看出，它和用`react`创建`class`没有很大区别。

   除了`mapStateToProps`函数，如字面意思所说，`return`中的 key 为`books`，也就是`renderBooks()`函数中使用的`this.props.books`。对应的`state.books`也就是之前`reducer`中的`books: booksReducer`

   以及`connect`函数，将`mapStateToProps`函数和此`container`关联起来

   有了 container 之后，记得在`app.js`中引用它，它只关心自己要把 container 渲染到页面中，不关心它们内部发生了什么

   ```js
   import React, { Component } from 'react';

   import BookList from '../containers/book-list';

   export default class App extends Component {
     render() {
       return (
         <div>
           <BookList />
         </div>
       );
     }
   }
   ```

   依然和`react`没什么不同

   于是，刷新页面，可以看到页面上显示了一个列表，而列表中的数据也就是`reducer_books.js`中的数据

4. 然而到目前为止，整个列表是静态的，点击也不会有任何反应。为此，需要添加`action`。`action`即是用户发出的动作，比如点击或者在`input`中输入内容

   在`redux`中，用户发出`action` => 调用`action creator` => `action creator`返回`action` => `action`发送到所有的`reducer`中处理，根据`action`的`type`，计算出新的`state`

   这个例子中只有一个`action`，点击列表中的某一项，然后显示出该项的信息

   ```js
   export default function selectBook(book) {
     // selectBook is a ActionCreator, it needs to return an action
     // an object with a type property
     console.log('You have selected a book.', book.title);
     return {
       type: 'BOOK_SELECTED',
       payload: book
     };
   }
   ```

   可以看到，`action creator`只是一个函数，它（需要）返回一个对象，也就是某一个`action`，这里只有一个`action`

   ```js
   // book-list.js
   // ...
   import { bindActionCreators } from 'redux';
   import selectBook from '../actions/index';

   class BookList extends Component {
   renderBooks() {
     return this.props.books.map((book) => {
       return (
         <li
           key={book.title}
           onClick={() => this.props.selectBook(book)}
           className="list-group-item">
           {book.title}
         </li>
       );
     });
   }
   // ...
   function mapDispatchToProps(dispatch) {
     // Whenever selecBook is called, the result should be passed to all of reducers
     return bindActionCreators({ selectBook: selectBook }, dispatch);
   }

   // Promote BookList from a component to a container - it needs to know about
   // this new dispatch method, selectBook. Make it available as a prop
   export default connect(mapStateToProps, mapDispatchToProps)(BookList);
   ```

   修改`book-list.js`

   `mapDispatchToProps`函数用来把`action`转为`container`中的`this.props`，`{selectBook: selectBook}`中的第二个`selectBook`即是引入的`action`，第一个`selectBook`即是`onClick={}`中的`this.props.selectBook`

   在`<li></li>`中添加`onClick={}`属性也就是当点击列表中的某一项时，执行其中的函数，而这个函数即是之前的`action`

   刷新页面，当点击列表时，出现了对应的`console.log()`内容。需要注意的是，如何没有其中的`return`语句，会出现警告，因为`action`需要是一个`plain object`。而`action`中的`type`是必须的

5. 虽然`action`看上去执行成功了（得到了`console.log()`信息），但是还需要对应的`reducer`才能真正的起作用

   创建`reducer_active_book.js`，然后在总的`reducer`中引用它

   ```js
   export default function (state = null, action) {
     switch (action.type) {
       case 'BOOK_SELECTED':
         return action.payload;
     }
     return state;
   }
   ```

   ```js
   // reducers/index.js
   // ...
   const rootReducer = combineReducers({
     books: BooksReducer,
     activeBook: ActiveBook
   });
   // ...
   ```

   除此之外，为了显示书籍的具体信息，还需要一个新的 container ，创建`book-detail.js`，然后在`app.js`中引用它

   ```js
   import React, { Component } from 'react';
   import { connect } from 'react-redux';

   class BookDetail extends Component {
     render() {
       return (
         <div>
           <h3>Book detail:</h3>
           <div>{this.props.book.title}</div>
         </div>
       );
     }
   }

   function mapStateToProps(state) {
     return {
       book: state.activeBook
     }
   }

   export default connect(mapStateToProps)(BookDetail);
   ```

   刷新页面，然而却得到了一个错误`Cannot read property 'title' of null`。这里的`title`指得是`this.props.book.title`，也就是说`this.props.book`为`null`

   根据这里的`book: state.activeBook`来到`reducer_active_book.js`中，在这个`reducer`中，初始化`state = null`，意味着 app 初始化时， activeBook 的 state 为`null`，在 Javascript 中，不能读取`null`的某一个`property`，因此就报错了

   为此，在`render()`中添加如下

   ```js
   if (!this.props.book) {
     return <div>Select a book to get started.</div>
   }
   ```

   当`this.props.book`为`null`时，返回初始化的信息。而当用户发出`action`时，由于`reducer_active_book.js`中的`switch`语句改变了 state ，就可以获得对应的`this.props.book`