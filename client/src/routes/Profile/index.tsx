import React, { Dispatch, PropsWithChildren, useEffect } from 'react'
import { connect } from 'react-redux'
import { AxiosError } from "axios";
import { Descriptions, Button, Alert, message } from "antd";
import { CombinedState } from '../../store/reducers'
// import { ProfileState } from '../../store/profile'
import LOGIN_TYPES from '../../../typings/login-types'
// import actions from "../../store/actions/profile";

import NavHeader from "../../components/NavHeader";
import { RouteComponentProps } from "react-router-dom";

interface Params {}

type Props = PropsWithChildren<StateProps & Dispatch & RouterProps>

function Profile(props: Props) {
  /**
   * 组件加载后  直接发送验证请求 判断是否登入
   */
  useEffect(() => {
    props.validate().catch((error: AxiosError) => message.error(error.message))
  })
  let content;
  if (props.loginState == LOGIN_TYPES.UN_VALIDATE) {
    // 检测到未来登入
    content = null
  } else if(props.loginState === LOGIN_TYPES.LOGINED) {
    // 显示已经登入
    contnet = (
      <div className="user-info">
        <Descriptions title="当前登入用户">
        </Descriptions>
      </div>
    )
  } else {
    // 没有登入。显示注册和登入按钮
    content = (
      <>
        <Alert
          type="warning" 
          message="当前未登入" 
          description="亲爱的用户你好，你当前尚未登入，请选择注册或登入"/>
        <div style={{ textAlign: "center", padding: '50px' }}>
          <Button type="dashed" onClick={() => props.history.push('/logib')}>
            登录
          </Button>
          <Button type="dashed" style={{marginLeft: '50px'}} onClick={() => props.history.push('/register')}>
            注册
          </Button>
        </div>
      </>
    )
  }
  return (
    <section>
       <NavHeader history={props.history}>个人中心</NavHeader>
       {content}
    </section>
  )
}

let mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, actions)(Profile);