import { createContext, useReducer } from 'react'
import axios from 'axios'
import dashboardReducer from './DashboardReducer'

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
	const initialState = {
		records: [],
		balance: [],
		loading: false,
	}

	const [state, dispatch] = useReducer(dashboardReducer, initialState)

	const getRecords = async (symbol) => {
		setLoading()
		try {
			const res = await axios.get(`/api/v1/binance/records/${symbol}`)

			dispatch({
				type: 'GET_RECORDS',
				payload: res.data.records,
			})
		} catch (err) {
			dispatch({
				type: 'GET_RECORDS_ERROR',
			})
		}
	}

	const getBalance = async () => {
		setLoading()
		try {
			const res = await axios.get(`/api/v1/binance/balance`)

			dispatch({
				type: 'GET_BALANCE',
				payload: res.data.data,
			})
		} catch (err) {
			dispatch({
				type: 'GET_BALANCE_ERROR',
			})
		}
	}

	const setLoading = () => dispatch({ type: 'SET_LOADING' })

	return (
		<DashboardContext.Provider
			value={{
				records: state.records,
				balance: state.balance,
				getRecords,
				getBalance,
			}}
		>
			{children}
		</DashboardContext.Provider>
	)
}

export default DashboardContext
