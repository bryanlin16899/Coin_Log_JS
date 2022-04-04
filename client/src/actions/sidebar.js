import { SET_LOADING, GET_MARKET, CLEAR_MARKET } from './types'

const COIN_GECKO_URL =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false'

// const test = 'https://api.coingecko.com/api/v3/coins/list'

export const getMarketData = () => async (dispatch) => {
	setLoading(dispatch)
	// text()
	const response = await fetch(COIN_GECKO_URL)

	const data = await response.json()

	dispatch({
		type: GET_MARKET,
		payload: data,
	})
}

// export const text = async () => {
// 	const response = await fetch(test)

// 	const data = await response.json()

// 	const crypto_list = new Object()

// 	// data.map((coin) => {
// 	// 	crypto_list[coin.symbol] = coin.id
// 	// })

// 	console.log(data)
// }

export const clearMarket = () => (dispatch) => {
	dispatch({ type: CLEAR_MARKET, payload: [] })
}

const setLoading = (dispatch) => dispatch({ type: SET_LOADING })
