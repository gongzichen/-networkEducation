import axios from './index'
export function validate() {
	 return axios.get("/user/validate");
}