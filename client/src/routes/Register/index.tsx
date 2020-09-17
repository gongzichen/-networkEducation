import React from 'react'
import { connect, DispatchProp } from 'react-redux'
import actions from '../../store/actions/profile'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { CombinedState } from '@/store/reducers'
import { UserAddOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import './index.less'
import { ProfilState } from '@/store/reducers/profile'
import NavHeader from '@/components/NavHeader'

type StateProps = ReturnType<typeof mapStateProps>;
type DispatchProps = typeof actions
interface Params {}
type Props = RouteComponentProps<Params> & StateProps & DispatchProps

function Register(props: Props) {
	const onFinish = (values: any) => { props.register(values) }
	const onFinishFailed = (errorInfo: any) => { message.error('表单验证失败', errorInfo)}
	return (
		<>
			<NavHeader history={props.history}>用户注册</NavHeader>
			<Form className="register-form" onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入你的用户名' }]}>
					 <Input prefix={<UserAddOutlined />} placeholder="用户名" />
				</Form.Item>
				<Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入你的密码!" }]}>
					<Input prefix={<LockOutlined />} type="password" placeholder="密码" />
				</Form.Item>
				<Form.Item>
				<div style={{ textAlign: "center", padding: "40px" }}>
					<Button type="primary" htmlType="submit" className="login-form-button">
						登录
					</Button>
					或者 <Link to="/register">立刻注册!</Link>
				</div>
			</Form.Item>
			</Form>
		</>
	)
}

let mapStateProps = (state: CombinedState): ProfilState => state.profile
export default connect(mapStateProps, actions)(Register)

