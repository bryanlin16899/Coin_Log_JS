const dashboardReducer = (state, action) => {
	switch (action.type) {
		case 'GET_RECORDS':
			return {
				...state,
				records: action.payload,
				loading: false,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}
		case 'GET_BALANCE':
			return {
				...state,
				balance: action.payload,
				loading: false,
			}
		case 'GET_RECORDS_ERROR':
			return {
				...state,
				records: null,
				loading: false,
			}
		default:
			return state
	}
}

export default dashboardReducer
