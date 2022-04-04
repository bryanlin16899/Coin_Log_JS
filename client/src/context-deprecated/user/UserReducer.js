const userReducer = (state, action) => {
	switch (action.type) {
		case 'USER_SIGNUP':
		case 'USER_SIGNIN':
			localStorage.setItem('token', action.payload.token)
			return {
				...state,
				token: action.payload.token,
				isAuth: true,
				loading: false,
			}
		case 'USER_LOADED':
			return {
				...state,
				isAuth: true,
				loading: false,
				user: action.payload,
			}
		case 'AUTH_ERROR':
		case 'USER_SIGNOUT':
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

export default userReducer
