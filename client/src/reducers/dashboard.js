import {
	GET_BALANCE,
	GET_BALANCE_USD,
	GET_RECORDS,
	SET_LOADING,
	GET_AVERAGE_PRICE,
	GET_AVERAGE_PRICE_ERROR,
	GET_RECORDS_ERROR,
	CLEAR_AVERAGE_PRICE,
} from '../actions/types'

const initialState = {
	records: [],
	balance: [],
	balance_usd: {},
	average_price: {},
	loading: false,
}

export default function (state = initialState, action) {
	const { type, payload } = action

	switch (type) {
		case GET_RECORDS:
			return {
				...state,
				records: payload,
				loading: false,
			}
		case SET_LOADING:
			return {
				...state,
				loading: true,
			}
		case GET_BALANCE:
			return {
				...state,
				balance: payload,
				loading: false,
			}
		case GET_BALANCE_USD:
			return {
				...state,
				balance_usd: payload,
			}
		case GET_AVERAGE_PRICE:
			return {
				...state,
				average_price: payload,
				loading: false,
			}
		case GET_RECORDS_ERROR:
		case GET_AVERAGE_PRICE_ERROR:
			return {
				...state,
				records: null,
				loading: false,
			}
		case CLEAR_AVERAGE_PRICE:
			return {
				...state,
				average_price: [],
			}
		default:
			return state
	}
}
