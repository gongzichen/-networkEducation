import { AnyAction } from 'redux' 

import LOGIN_TYPES from "../../../typings/login-types";
import * as TYPES from '../action-types'

export interface ProfilState {
  loginState: LOGIN_TYPES, // 当前用户登入状态
  user: any, // 当前用户登入信息
  error: string |  null // 错误信息
}

let initialState: ProfilState = {
  loginState: LOGIN_TYPES.UN_VALIDATE, // 当前用户登入状态
  user: null, // 当前用户登入信息
  error: null // 错误信息
};

export default function (
  state: ProfilState = initialState,
  action: AnyAction
): ProfilState {
  switch (action.type) {
    case TYPES.VALIDATE: 
      if (action.play.success) {
        // 用户已经登入
        return {
          ...state,
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload.data, // 设置用户名
          error: null // 没有错误
        }
      } else {
        return {
          ...state,
          loginState: LOGIN_TYPES.UNLOGIN,
          user: null, // 用户名为空
          error: action.payload, // 错误对象赋值
        }
      }
    default:
      return state;
  }
}
