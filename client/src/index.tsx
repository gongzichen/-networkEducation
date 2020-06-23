import React from 'react';
import ReactDom from 'react-dom';
import { Switch, Route, Redirect } from 'react-router-dom'; // 路由组件
import { Provider } from 'react-redux'; // 负责把属性中的store 传递给子组件
// import store from  './store';  // 引入仓库
import { ConfigProvider } from 'antd'; // 配置
import zh_CN from 'antd/lib/locale-provider/zh_CN'; // 国际化中文
import './assets/css/common.less'; // 通用样式
import Tabs from './components/Tabs' // 底部导航标签 
import Home from './routes/Home'; // 首页
import Prpfile from './routes/Mine'; // 我的课程
import { ConnectedRouter } from 'connected-react-router' // redux 绑定路由
import history from './store/history'
// import {} 
ReactDOM.render(
	<Provider store={store}>
	
	</Provider>
)