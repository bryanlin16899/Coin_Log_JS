const Record = require('../models/Record')

const recordHelper = async (trade_history, user_id) => {
	trade_history.map(async (data) => {
		const { id, symbol, price, qty, quoteQty, time, isBuyer } = data
		if (!(await Record.exists({ record_id: id }))) {
			const record = new Record({
				user: user_id,
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
}

module.exports = recordHelper
