import React, { Component } from 'react';
import './App.scss';
import Home from '../pages/Home';

// TODO GTB-1: * 页面样式还原度较高，且实现都是通过接口方式
// TODO GTB-1: * 除了刷新页面没有立即显示已分组情况之外，功能全部实现
// TODO GTB-2: * 没有测试
// TODO GTB-3: * 没有做组件拆分，只有一个Home组件，思考如何拆分与复用组件
// TODO GTB-3: * 语义化标签使用不好
// TODO GTB-3: * 使用了flex和scss嵌套
// TODO GTB-3: * 运用了ES6+语法及axios
// TODO GTB-3: * 运用React相关知识点，但未拆分组件，一些知识点无法验证
// TODO GTB-4: * 有小步提交意识，但提交可以更小步，message更明确，如拆分组件后以组件粒度等
// TODO GTB-4: * 没有抽出Api请求层
// TODO GTB-4: * 没有做组件拆分，Home组件过长
// TODO GTB-4: * 没有组件拆分所以scss也没有拆分
// TODO GTB-4: * eslint error 较多，需要fix
class App extends Component {
  render() {
    return (
      <div data-testid="app" className="App">
        <Home />
      </div>
    );
  }
}

export default App;
