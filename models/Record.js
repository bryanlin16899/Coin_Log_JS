const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	record_id: {
		type: String,
	},
	symbol: {
		type: String,
	},
	price: {
		type: Number,
	},
	quantity: {
		type: Number,
	},
	cost: {
		type: Number,
	},
	isBuyer: {
		type: Boolean,
	},
	date: {
		type: Date,
	},
})

module.exports = Record = mongoose.model('Record', RecordSchema)
