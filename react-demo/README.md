# react-demo

> [see more](https://github.com/ruanyf/jstraining/blob/master/docs/react.md)

## JSX语法

+ React 使用 JSX 语法，JavaScript 代码中可以写 HTML 代码。

```jsx
let myTitle = <h1>Hello, world!</h1>;
```

+ JSX 语法的最外层，只能有一个节点。
+ JSX 语法中可以插入 JavaScript 代码，使用大括号。

```jsx
// 错误
let myTitle = <p>Hello</p><p>World</p>;
// 正确
let myTitle = <p>{'Hello ' + 'World'}</p>
```

## 写代码之前

```jsx
<script src="react.js"></script> // 核心库
<script src="react-dom.js"></script> // DOM适配库
<script src="babel.min.js"></script> // 转码
<script type="text/babel"> // 注意加type
  // ** Our code goes here! **
</script>
```

## index01 JSX

+ `ReactDOM.render`方法接受两个参数：一个虚拟 DOM 节点和一个真实 DOM 节点，作用是将虚拟 DOM 挂载到真实 DOM。

```jsx
ReactDOM.render(
  <span>Hello REACT!</span>,          // 注意这里不是以 ; 结尾
  document.getElementById('example')
);
```

## index02 React 组件语法

1. `class MyTitle extends React.Component`是 ES6 语法，表示自定义一个`MyTitle`类，该类继承了基类`React.Component`的所有属性和方法。
2. React 规定，自定义组件的第一个字母必须大写，比如`MyTitle`不能写成`myTitle`，以便与内置的原生类相区分。
3. 每个组件都必须有`render`方法，定义输出的样式。
4. `<MyTitle/>`表示生成一个组件类的实例，每个实例一定要有闭合标签，写成`<MyTilte></MyTitle>`也可。

```jsx
class MyTitle extends React.Component { // 1 2
  render() {                            // 3
    return <h1>Hello World!</h1>;
  }
};

ReactDOM.render(
  <MyTitle/>,                           // 4
  document.getElementById('example')
);
```

## index03 React 组件的参数

+ 组件内部通过`this.props`对象获取参数。

```jsx
class MyTitle extends React.Component {
  render() {
    return <h1 style={{color: this.props.color}}>Hello World!</h1>;
  }
};

ReactDOM.render(
  <MyTitle color="yellow"/>,
  document.getElementById('example')
);
```

## index04 React 组件的状态

1. `constructor`是组件的构造函数，会在创建实例时自动调用。`...args`表示组件参数。
2. `super(...args)`是 ES6 规定的写法。
3. `this.state`对象用来存放内部状态，这里是定义初始状态。
4. `this.state.name`表示读取`this.state`的`name`属性。
5. 每当输入框有变动，就会自动调用`onChange`指定的监听函数，这里是`this.handleChange`，`.bind(this)`表示该方法内部的`this`，绑定当前组件。
6. `this.setState`方法用来重置`this.state`，每次调用这个方法，就会引发组件的重新渲染。

```jsx
class MyTitle extends React.Component {
  constructor(...args) {                    // 1
    super(...args);                         // 2
    this.state = {                          // 3
      name: '访问者'
    };
  }

  handleChange(e) {
    let name = e.target.value;
    this.setState({                         // 6
      name: name
    });
  }

  render() {
    return <div>
      <input type="text" onChange={this.handleChange.bind(this)} /> // 5
      <p>你好，{this.state.name}</p>                                 // 4
    </div>;
  }
};

ReactDOM.render(
  <MyTitle/>,
  document.getElementById('example')
);
```

## index-05 React 组件实战

点击`Hello World`，变成了`Hello Clicked`

1. 修改源码，使得点击`Hello World`后，会显示当前的日期，比如`Hello 2016年1月1日`。

2. 请在上一步练习的基础上，进一步修改。现在`Hello World`点击一次，会改变内容，再点击就不会有反应了。请将其改成，再点击一次变回原样。

```jsx
var d = new Date();
class MyTitle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      text: 'World',
      isClicked: false                             // 2
    };
  }

  handleClick() {
    let isClicked = !this.state.isClicked;
    this.setState({
      // text: 'Clicked'
      // text: `Today is ${d.getFullYear()}年${d.getMonth()}月${d.getDate()}日`   // 1
      isClicked: isClicked,                        // 2
      text: isClicked ? 'Clicked' : 'Word'         // 2
    });
  }

  render() {
    return <h1 onClick={this.handleClick.bind(this)}>
      {'Hello ' + this.state.text}
    </h1>;
  }
};

ReactDOM.render(
  <MyTitle/>,
  document.getElementById('example')
);
```

## index-06 React 组件的生命周期

1. `componentDidMount`方法在组件加载后执行，只执行一次。本例在这个方法里向服务器请求数据，操作结束前，组件都显示`Loading`。
2. `$.getJSON`方法用于向服务器请求 JSON 数据。
3. `this.state.loading`记录数据加载是否结束。只要数据请求没有结束，`this.state.loading`就一直是`true`，网页上显示`loading`。
4. `this.state.error`保存数据请求失败时的错误信息。如果请求失败，`this.state.error`就是返回的错误对象，网页上显示报错信息。
5. `this.state.data`保存从服务器获取的数据。如果请求成功，可以先用`console.log`方法，将它在控制台里打印出来，看看数据结构。

```jsx
class MyList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      loading: true,                                                                  // 3
      error: null,                                                                    // 4
      data: null                                                                      // 5
    };
  }

  componentDidMount() {                                                               // 1
    const url = 'https://api.github.com/search/repositories?q=javascript&sort=stars';
    $.getJSON(url)                                                                    // 2
    .done(
      (value) => this.setState({
        loading: false,                                 // 不管请求 JSON 数据成功还是失败，loading 状态变为 false
        data: value
      })
    ).fail(
      (jqXHR, textStatus) => this.setState({
        loading: false,
        error: jqXHR.status                             // 获得错误信息
      })
    );
  }

  render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error}</span>;
    } else {
      console.log(this.state.data);
      var projects = this.state.data.items;              // 进入 JSON 数据的链接查看它的结构
      var results = [];
      projects.forEach(p => {
        var item =<li>{p.name}</li>;                     // 获得 items 的 name 属性
        results.push(item);                              // 插入到 results 数组
      });
      return (
        <div>
          <p>API 数据获取成功</p>
          <p>{results}</p>
        </div>
      );
    }
  }
};

ReactDOM.render(
  <MyList />,
  document.getElementById('example')
);
```




