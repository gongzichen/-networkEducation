import { AnyAction } from "redux";
import * as TYPES from "../action-types";
import { validate } from "@/api/profile";
export default {
  //https://github.com/redux-utilities/redux-promise/blob/master/src/index.js
  validate(): AnyAction {
    //发起判断当前用户是否登录的请求
    return {
      type: TYPES.VALIDATE,
      payload: validate(),
    };
  },
};

