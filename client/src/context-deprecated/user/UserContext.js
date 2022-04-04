import { createContext, useReducer } from 'react'
import axios from 'axios'
import userReducer from './UserReducer'
import setAuthToken from '../../utils/setAuthToken'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuth: null,
		loading: false,
		user: null,
	}

	const [state, dispatch] = useReducer(userReducer, initialState)

	const signUpUser = async ({ email, password, apiKey, apiSecret }) => {
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
				type: 'USER_SIGNUP',
				payload: res.data,
			})
		} catch (err) {
			console.log(err)
		}
	}

	const signInUser = async ({ email, password }) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const body = JSON.stringify({ email, password })
		try {
			const res = await axios.post('/api/v1/auth/', body, config)

			dispatch({
				type: 'USER_SIGNIN',
				payload: res.data,
			})
		} catch (err) {
			console.log(err)
		}
	}

	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token)

			try {
				const res = await axios.get('/api/v1/auth')

				dispatch({
					type: 'USER_LOADED',
					payload: res.data,
				})
			} catch (err) {
				dispatch({
					type: 'AUTH_ERROR',
				})
			}
		}
	}

	const signOutUser = async () => dispatch({ type: 'USER_SIGNOUT' })

	return (
		<UserContext.Provider
			value={{
				isAuth: state.isAuth,
				token: state.token,
				signUpUser,
				loadUser,
				signOutUser,
				signInUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContext
