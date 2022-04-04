import { SET_LOADING, GET_MARKET, CLEAR_MARKET } from '../actions/types'

const initialState = {
	coin_market: [],
	market_display: false,
	loading: false,
}

export default function (state = initialState, action) {
	const { type, payload } = action

	switch (type) {
		case GET_MARKET:
			return {
				...state,
				coin_market: payload,
				market_display: true,
				loading: false,
			}
		case SET_LOADING:
			return {
				...state,
				loading: true,
			}
		case CLEAR_MARKET:
			return {
				...state,
				market_display: false,
				loading: false,
			}
		default:
			return state
	}
}
