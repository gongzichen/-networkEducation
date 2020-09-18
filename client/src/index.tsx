import React from 'react';
import ReactDom from 'react-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from  './store'; 
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '@/assets/css/common.less';
import Tabs from '@/components/Tabs'
import Home from '@/routes/Home';
import Mine from '@/routes/Mine';
import Profile from '@/routes/Profile';
import Login from '@/routes/Login';
import Register from '@/routes/Register';
import Detail from './routes/Detail'; // 详情
// import Cart from '@/routes/Cart'; // 购物车
// import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from 'connected-react-router' // redux 绑定路由
import history from './store/history'
import 'lib-flexible'

ReactDom.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} presistor={PersistGate}> */}
      <ConnectedRouter history={history}>
        <ConfigProvider locale={zh_CN}>
          <main className="main-container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/mine" component={Mine} />
              <Route path="/profile" component={Profile} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/detail/:id" component={Detail} />
              {/* <Route path="/cart" component={Cart} /> */}
              <Redirect to="/" />
            </Switch>
          </main>
          <Tabs />
        </ConfigProvider>
      </ConnectedRouter>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById("root")
);