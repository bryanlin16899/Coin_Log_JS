const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
	try {
		const connect = mongoose.connect(process.env.MONGODB_URI)

		console.log(
			`MongoDB Connected: ${(await connect).connection.host}`.cyan
				.underline.bold
		)
	} catch (err) {
		console.log(err.message)

		process.exit(1)
	}
}

module.exports = connectDB
