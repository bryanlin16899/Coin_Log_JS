const express = require('express')
const Binance = require('node-binance-api')
const Binance_node = require('binance-api-node').default // two diffrence package
const timestamp_to_date = require('timestamp-to-date')
const authMid = require('../middleware/authMid')

const Record = require('../models/Record')
const User = require('../models/User')

const router = express.Router()

// @route    GET api/v1/binance/balance
// @desc     Get user all assets in binance
// @access   Private
router.get('/balance', authMid, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		const binance = new Binance().options({
			APIKEY: user.api_key,
			APISECRET: user.api_secret,
		})

		let raw_info = await binance.balance()
		if (!raw_info) {
			return res.status(404).json({
				error: 'Not found any balance.',
			})
		}
		const info_obj = Object.keys(raw_info).reduce(function (k_v, key) {
			if (raw_info[key].available > 0) k_v[key] = raw_info[key]
			return k_v
		}, {})
		// [key, info_obj[key]]info_obj[key].available
		const balance = new Array()
		Object.keys(info_obj).map((key) => {
			balance.push({ key: key, data: info_obj[key].available })
		})
		user.balance = balance
		await user.save()

		res.status(200).send({ data: balance })
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server error')
	}
})

// @route    GET api/v1/binance/balanceforusd
// @desc     Get user all assets in binance
// @access   Private
router.get('/balanceforusd', authMid, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		const binance = new Binance().options({
			APIKEY: user.api_key,
			APISECRET: user.api_secret,
		})
		const current_price = await binance.prices()

		let balanceForUsd = user.balance
		let totalBalance = 0
		balanceForUsd.map((coin) => {
			let ticker = coin.key.concat('USDT')
			if (ticker !== 'USDTUSDT') {
				if (ticker.includes('LD')) {
					ticker = ticker.split('LD')[1]
				}
				let price = Number(current_price[ticker])

				coin.data = price * coin.data
			} else {
				coin.data = Number(coin.data)
			}
			totalBalance += coin.data
		})

		res.status(200).json({ balanceForUsd, total: totalBalance.toFixed(3) })
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server error')
	}
})

// @route    GET api/v1/binance/averageprice
// @desc     Get specfic token average price chart
// @access   Private
router.get('/averageprice/:symbol', authMid, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')

		const records = await Record.find({
			user: user.id,
			symbol: req.params.symbol,
		}).sort({ date: 1 })

		let trend = new Array()
		let static_total_cost = 0
		let static_total_amount = 0
		records.map((record, index) => {
			record.isBuyer
				? (static_total_amount += record.quantity)
				: (static_total_amount -= record.quantity)
			record.isBuyer
				? (static_total_cost += record.cost)
				: (static_total_cost -= record.cost)

			trend.push({
				key: index + 1,
				data: (static_total_cost / static_total_amount).toFixed(4),
			})
		})
		trend.push({
			key: records.length + 1,
			data: (static_total_cost / static_total_amount).toFixed(4),
		})

		res
			.status(200)
			.json({ data: trend, avg_price: trend[trend.length - 1]['data'] })
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server error: averageprice route')
	}
})

// @route    GET api/v1/binance/records/:symbol
// @desc     Get user trade records for spcific symbol
// @access   Private
router.get('/records/:symbol', authMid, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		const binance = new Binance().options({
			APIKEY: user.api_key,
			APISECRET: user.api_secret,
		})

		const records = await Record.find({
			user: user.id,
			symbol: req.params.symbol,
		}).sort({ date: -1 })

		const trade_history = await binance.trades(req.params.symbol)

		if (trade_history.length === 0) {
			return res.status(404).json({ error: 'Trade not found.' })
		}

		const untrack_record = trade_history.length - records.length
		if (untrack_record) {
			const info = new Array()
			const untrack = trade_history.slice(-untrack_record)
			untrack.map((data) => {
				const { id, symbol, price, qty, quoteQty, time, isBuyer } = data
				const newObj = {
					user: user.id,
					record_id: id.toString(),
					symbol: symbol,
					price: Number(price),
					quantity: Number(qty),
					cost: Number(quoteQty),
					date: timestamp_to_date(time, 'yyyy-MM-dd'),
					isBuyer: isBuyer,
				}
				info.unshift(newObj)
			})
			await Record.create(info)
			return res.status(200).json({ records: info })
		}
		res.status(200).json({ records })
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server error')
	}
})

// @route    GET api/v1/binance/deposit
// @desc     Get user deposit history
// @access   Private
router.get('/deposit', authMid, async (req, res) => {
	const user = await User.findById(req.user.id).select('-password')
	const binance = Binance_node({
		apiKey: user.api_key,
		apiSecret: user.api_secret,
	})
	// 1day = 86,400,000 => 2m29d = 7,689,600,000 ms
	// 2years ago now - 61516800000
	info = new Array()
	let start = Date.now() - 63000000000
	let end = start + 7689600000
	for (let i = 1; i < 10; i++) {
		const deposit = await binance.depositHistory({
			coin: 'USDT',
			startTime: start,
			endTime: end,
		})
		deposit.map((data) => {
			const { amount, coin, address, insertTime } = data
			const ele = {
				amount: Number(amount),
				coin,
				address,
				insertTime: timestamp_to_date(insertTime, 'yyyy-MM-dd'),
			}
			info.push(ele)
		})

		start += 7689600000
		end += 7689600000
	}

	res.status(200).json({ data: info })
})

module.exports = router
