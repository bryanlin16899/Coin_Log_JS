import {
	USER_LOADED,
	USER_SIGNIN,
	USER_SIGNOUT,
	USER_SIGNUP,
	AUTH_ERROR,
} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const signUpUser =
	({ email, password, apiKey, apiSecret }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const api_key = apiKey
		const api_secret = apiSecret

		const body = JSON.stringify({ email, password, api_key, api_secret })
		try {
			const res = await axios.post('/api/v1/users/', body, config)

			dispatch({
				type: USER_SIGNUP,
				payload: res.data,
			})
		} catch (err) {
			console.log(err)
		}
	}

export const signInUser =
	({ email, password }) =>
	async (dispatch) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const body = JSON.stringify({ email, password })
		try {
			const res = await axios.post('/api/v1/auth/', body, config)

			dispatch({
				type: USER_SIGNIN,
				payload: res.data,
			})
		} catch (err) {
			console.log(err)
		}
	}

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token)

		try {
			const res = await axios.get('/api/v1/auth')

			dispatch({
				type: USER_LOADED,
				payload: res.data.email,
			})
		} catch (err) {
			dispatch({
				type: AUTH_ERROR,
			})
		}
	}
}

export const signOutUser = () => async (dispatch) =>
	dispatch({ type: USER_SIGNOUT })
