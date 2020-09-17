import { AnyAction } from "redux";
import * as TYPES from "../action-types";
import { validate, logout, register, login } from "@/api/profile";
import { push } from 'connected-react-router'
import { RegisterPayload, LoginPayload, RegisterResult, LoginResult } from '../../../typings/user'
import { message } from 'antd'

export default {
  //https://github.com/redux-utilities/redux-promise/blob/master/src/index.js
  validate(): AnyAction {
    //发起判断当前用户是否登录的请求
    return {
      type: TYPES.VALIDATE,
      payload: validate()
    };
  },
  register (values: RegisterPayload) {
	return function (dispatch: any) {
		(async function () {
			try {
				let result: RegisterResult = await register<RegisterResult>(values)
				if (result.success) {
					dispatch(push('/login'))
				} else {
					message.error(result.message)
				}
			} catch (error) {
				message.error('注册失败')
			}
		})()
	}
  },
  login (values: LoginPayload) { 
	return function (dispatch: any) {
		(async function () {
			try {
			 let result: LoginResult = await login<LoginResult>(values);
			 if (result.success) {
				 sessionStorage.setItem('access_token', result.data.token)
				 dispatch(push('/profile'))
			 } else {
				 message.error(result.message)
			 }
			} catch (error) {
				message.error
			}
		})()
	}
  },
  logout(){
	  return function (dispatch: any) {
		  sessionStorage.removeItem('access_token')
		  dispatch({type: TYPES.LOGOUT})
		  dispatch(push('/login'))
	  }
  },
  changeAvatar(avatar: string) {
	  return {
		type: TYPES.CHANGE_AVATAR,
		payload: avatar,
	  }
  }
};
