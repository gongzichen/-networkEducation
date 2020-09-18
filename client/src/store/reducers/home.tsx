import { AnyAction } from "redux";
import * as TYPES from '../action-types'
import Slider from '../../../typings/slider'

export interface HomeState {
  currentCategory: string,
  sliders: []
}

let initialState: HomeState = {
  currentCategory: 'all',  // 默认为全部分类
  sliders: []
};


export default function (
  state: HomeState = initialState,
  action: AnyAction
): HomeState {
  switch (action.type) {
    case TYPES.SET_CURRENT_CATEGORY: // 修改当前分类
      return {...state, currentCategory: action.payload}
    case TYPES.GET_SLIDERS:
      return { ...state, sliders: action.payload.data}
    default:
      return state;
  }
}
