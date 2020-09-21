import  * as TYPES from '../action-types';
import { getSliders,  getLessons } from '@/api/home'
import { StoreGetState, StoreDispatch } from '../index'
import { Result } from 'antd';
export default {
	setCurrentCategory(currentCategory: string) {
		return { type: TYPES.SET_CURRENT_CATEGORY, payload: currentCategory }
	},
	getSliders() {
		return {
			type: TYPES.GET_SLIDERS,
			payload: getSliders()
		}
	},
	getLesson () {
		return (dispatch: StoreDispatch, getState: StoreGetState) => {
			(async function () {
				let { currentCategory, lessons: { hasMore, offset, limit, loading }} = getState().home;
				if (hasMore && !loading) {
					dispatch({ type: TYPES.SET_LESSONS_LOADING, payload: true })
					let result = await getLessons(currentCategory, offset, limit)
					dispatch({ type: TYPES.SET_LESSONS, payload: result.data})
				}
			})()
		}
	},
	refreshLessons() {
		return (dispatch: StoreDispatch, getState : StoreGetState) {
			(async function () {
				let {
					currentCategory, lessons: { limit, loading }
				} = getState().home

				if (!loading) {
					dispatch({ type: TYPES.SET_LESSONS_LOADING, payload: true})
					let result = await getLessons(currentCategory, 0, limit)
					dispatch({type: TYPES.REFRESH_LESSONS, payload: result.data})
				}
			})()
		}
	}
}

