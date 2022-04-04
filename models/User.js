const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please add a email'],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email.',
		],
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false,
	},
	api_key: {
		type: String,
	},
	api_secret: {
		type: String,
	},
	balance: {
		type: [],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

module.exports = User = mongoose.model('User', UserSchema)
