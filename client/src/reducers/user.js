import {
	USER_LOADED,
	USER_SIGNIN,
	USER_SIGNOUT,
	USER_SIGNUP,
	AUTH_ERROR,
} from '../actions/types'

const initialState = {
	token: localStorage.getItem('token'),
	isAuth: null,
	loading: false,
	user: null,
}

export default function (state = initialState, action) {
	const { type, payload } = action

	switch (type) {
		case USER_SIGNUP:
		case USER_SIGNIN:
			localStorage.setItem('token', payload.token)
			return {
				...state,
				token: payload.token,
				isAuth: true,
				loading: false,
			}
		case USER_LOADED:
			return {
				...state,
				isAuth: true,
				loading: false,
				user: payload,
			}
		case AUTH_ERROR:
		case USER_SIGNOUT:
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuth: false,
				user: null,
				loading: false,
			}
		default:
			return state
	}
}
