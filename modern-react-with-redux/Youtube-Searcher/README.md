# README

> [Starter Kit from ...](https://github.com/StephenGrider/ReduxSimpleStarter)

> [course from ...](https://www.udemy.com/react-redux/)

## Note

React Basic

```js
// 1.
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return <div>Hi!</div>;
};

ReactDOM.render(
  <App />,
  document.querySelector('.container')
);

// 2.
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return <div>Hi!</div>;
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('.container')
);
```

整个`App`分为 4 个`component`，`search bar`，`video detail`，`video list`，`video list item`

利用 `Youtube API`以及`youtube-api-search`模块完成搜索功能。


*To be continued...*
