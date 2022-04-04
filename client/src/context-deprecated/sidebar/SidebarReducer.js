const sidebarReducer = (state, action) => {
	switch (action.type) {
		case 'GET_MARKET':
			return {
				...state,
				coin_market: action.payload,
				market_display: true,
				loading: false,
			}
		case 'SET_LOADING':
			return {
				...state,
				loading: true,
			}
		case 'CLEAR_MARKET':
			return {
				...state,
				market_display: false,
				loading: false,
			}
		default:
			return state
	}
}

export default sidebarReducer
