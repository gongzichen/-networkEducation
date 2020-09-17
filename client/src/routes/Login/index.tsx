import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import actions from '@/store/actions/profile'
import { Link, RouteComponentProps } from 'react-router-dom'
import NavHeader from '@/components/NavHeader'
import { Form, Input, Button, message } from "antd";
import './index.less'

import { CombinedState } from '@/store/reducers'
import { ProfilState } from '@/store/reducers/profile'
import { UserAddOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actions
interface Params {}
type Props = RouteComponentProps<Params> & StateProps & DispatchProps
function Login(props: Props) {
  const onFinish = (values: any) => {
    props.login(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    message.error("表单验证失败! " + errorInfo);
  };
  return (
    <>
      <NavHeader history={props.history}>用户登录</NavHeader>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="login-form"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入你的用户名!" }]}
        >
          <Input prefix={<UserAddOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入你的密码!" }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          或者 <Link to="/register">立刻注册!</Link>
        </Form.Item>
      </Form>
    </>
  );
}

const mapStateToProps = (state: CombinedState): ProfilState => state.profile;
export default connect(mapStateToProps, actions)(Login)


