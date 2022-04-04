import { createContext, useReducer } from 'react'
import sidebarReducer from './SidebarReducer'

const SidebarContext = createContext()

const COIN_GECKO_URL =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false'

export const SidebarProvider = ({ children }) => {
	const initialState = {
		coin_market: [],
		market_display: false,
		loading: false,
	}

	const [state, dispatch] = useReducer(sidebarReducer, initialState)

	const getMarketData = async () => {
		setLoading()

		const response = await fetch(COIN_GECKO_URL)

		const data = await response.json()

		dispatch({
			type: 'GET_MARKET',
			payload: data,
		})
	}

	const clearMarket = () => {
		dispatch({ type: 'CLEAR_MARKET', payload: [] })
	}

	const setLoading = () => dispatch({ type: 'SET_LOADING' })

	return (
		<SidebarContext.Provider
			value={{
				coin_market: state.coin_market,
				market_display: state.market_display,
				loading: state.loading,
				getMarketData,
				clearMarket,
			}}
		>
			{children}
		</SidebarContext.Provider>
	)
}

export default SidebarContext
