const express = require('express')
const Binance = require('node-binance-api')
const authMid = require('../middleware/authMid')

const Record = require('../models/Record')
const User = require('../models/User')
const recordHelper = require('../utils/recordHelper')

const router = express.Router()

// @route    GET api/user
// @desc     Get user infomation
// @access   Private
router.get('/binance/info/', authMid, async (req, res) => {
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

		const balance = Object.keys(info_obj).map((key) => [key, info_obj[key]])

		res.status(200).json({ balance })
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server error')
	}
})

router.get('/binance/records/:symbol', authMid, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		const binance = new Binance().options({
			APIKEY: user.api_key,
			APISECRET: user.api_secret,
		})

		const trade_history = await binance.trades(req.params.symbol)
		if (trade_history.length === 0) {
			return res.status(404).json({ error: 'Trade not found.' })
		}

		trade_history.map(async (data) => {
			const { id, symbol, price, qty, quoteQty, time, isBuyer } = data
			if (!(await Record.exists({ record_id: id }))) {
				const record = new Record({
					user: user.id,
					record_id: id,
					symbol,
					price,
					quantity: qty,
					cost: quoteQty,
					isBuyer,
					date: time,
				})

				await record.save()
			}
		})

		const records = await Record.find({
			user: req.user.id,
			symbol: req.params.symbol,
		}).sort('-date')

		res.status(200).json({ records })
	} catch (err) {
		console.log(err.message)
		res.status(500).send('Server error')
	}
})

module.exports = router
