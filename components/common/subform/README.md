# @form-create/component-subform

@form-create 内置组件

[GitHub](https://github.com/xaboy/form-create) | [文档](http://form-create.com/v3/) | [Document](http://form-create.com/v3/)

## 新增

### scroll 属性

在表格等狭窄布局中使用子表单时，可以通过 `scroll` 属性为子表单外层添加横向滚动条，避免内容被压缩。

```vue
<fc-sub-form :rule="rule" :options="options" v-model="value" scroll />
```


