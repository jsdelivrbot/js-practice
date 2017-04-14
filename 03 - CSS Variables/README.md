Note
===

HTML
---

> [HTML <label> 标签](http://www.w3school.com.cn/tags/tag_label.asp)

```js
<label for="spacing">Spacing:</label>
<input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">
```js

for 属性规定 label 与哪个表单元素绑定。

CSS
---

> [:root](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
> [使用CSS变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)

    :root {
      --base: #ffc600;
      --spacing: 10px;
      --blur: 10px;
    }

声明全局CSS变量时:root很有用。

    img {
      padding: var(--spacing);
      background: var(--base);
      filter: blur(var(--blur));
    }
    .hl {
      color: var(--base);
    }

像这样使用CSS变量。

JS
---
