import {
	GET_BALANCE,
	GET_BALANCE_USD,
	GET_RECORDS,
	SET_LOADING,
	GET_AVERAGE_PRICE,
	GET_AVERAGE_PRICE_ERROR,
	GET_RECORDS_ERROR,
	GET_BALANCE_ERROR,
} from './types'

import axios from 'axios'

export const getRecords = (symbol) => async (dispatch) => {
	setLoading(dispatch)
	try {
		const res = await axios.get(`/api/v1/binance/records/${symbol}`)

		dispatch({
			type: GET_RECORDS,
			payload: res.data.records,
		})
	} catch (err) {
		dispatch({
			type: GET_RECORDS_ERROR,
		})
	}
}

export const getBalanceForUsd = () => async (dispatch) => {
	setLoading(dispatch)

	try {
		const res = await axios.get('/api/v1/binance/balanceforusd')

		dispatch({
			type: GET_BALANCE_USD,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: GET_BALANCE_ERROR,
		})
	}
}

export const getBalance = () => async (dispatch) => {
	setLoading(dispatch)
	try {
		const res = await axios.get(`/api/v1/binance/balance`)

		dispatch({
			type: GET_BALANCE,
			payload: res.data.data,
		})
	} catch (err) {
		dispatch({
			type: GET_BALANCE_ERROR,
		})
	}
}

export const getAveragePrice = (symbol) => async (dispatch) => {
	setLoading(dispatch)
	try {
		const res = await axios.get(`/api/v1/binance/averageprice/${symbol}`)
		console.log(res)
		dispatch({
			type: GET_AVERAGE_PRICE,
			payload: res.data,
		})
	} catch (err) {
		console.log(err)
		dispatch({
			type: GET_AVERAGE_PRICE_ERROR,
		})
	}
}

const setLoading = () => (dispatch) => dispatch({ type: SET_LOADING })
