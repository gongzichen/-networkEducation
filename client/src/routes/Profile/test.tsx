import React, { PropsWithChildren, useEffect } from "react";
import { connect } from "react-redux";
import { CombinedState } from "../../store/reducers";
import { ProfileState } from "../../store/reducers/profile";
import actions from "../../store/actions/profile";
import LOGIN_TYPES from "../../typings/login-types";
import { RouteComponentProps } from "react-router";
import { Descriptions, Button, Alert, message } from "antd";
import NavHeader from "../../components/NavHeader";
import { AxiosError } from "axios";
import "./index.less";
//当前的组件有三个属性来源
//1.mapStateToProps的返回值 2.actions对象类型 3. 来自路由 4.用户传入进来的其它属性
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface Params {}
type RouteProps = RouteComponentProps<Params>;
type Props = PropsWithChildren<StateProps & DispatchProps & RouteProps>;
function Profile(props: Props) {
  //组件加载后直接 发起验证请求,查看此用户是否已经登录过了,如果没有登录则提示错误
  useEffect(() => {
    props.validate().catch((error: AxiosError) => message.error(error.message));
  }, []);
  let content; //里存放着要渲染的内容
  if (props.loginState == LOGIN_TYPES.UN_VALIDATE) {
    //如果未验证则内容为null
    content = null;
  } else if (props.loginState == LOGIN_TYPES.LOGINED) {
    //如果已经登录显示用户信息
    content = (
      <div className="user-info">
        <Descriptions title="当前登录用户">
          <Descriptions.Item label="用户名">珠峰架构</Descriptions.Item>
          <Descriptions.Item label="手机号">15718856132</Descriptions.Item>
          <Descriptions.Item label="邮箱">zhangsan@qq.com</Descriptions.Item>
        </Descriptions>
        <Button type="primary">退出登录</Button>
      </div>
    );
  } else {
    //如果没有登录,则显示注册和登录按钮
    content = (
      <>
        <Alert
          type="warning"
          message="当前未登录"
          description="亲爱的用户你好，你当前尚未登录，请你选择注册或者登录"
        />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Button type="dashed" onClick={() => props.history.push("/login")}>
            登录
          </Button>
          <Button
            type="dashed"
            style={{ marginLeft: "50px" }}
            onClick={() => props.history.push("/register")}
          >
            注册
          </Button>
        </div>
      </>
    );
  }
  return (
    <section>
      <NavHeader history={props.history}>个人中心</NavHeader>
      {content}
    </section>
  );
}

let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, actions)(Profile);