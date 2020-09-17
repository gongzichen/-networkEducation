import axios from './index'

import { RegisterPayload, LoginPayload } from '../../typings/user'

export function validate() {
	 return axios.get("/user/validate");
}

export function register<T>(values: RegisterPayload) {
	return axios.post<T, T>('user/register', values)
}

export function login<T>(values: LoginPayload) {
	return axios.post<T, T>('user/login', values)
}

export function logout () {
	return axios.get('/user/logout')
}