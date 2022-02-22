const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMid = require('../middleware/authMid')

const User = require('../models/User')

const router = express.Router()

// @route    GET api/auth
// @desc     Get auth user by request user.id
// @access   Public
router.get('/', authMid, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')

		res.status(200).json(user)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error.')
	}
})

// @route    POST api/auth
// @desc     User Login
// @access   Public
router.post(
	'/',
	[
		check('email', 'Email is not valid.').isEmail(),
		check('password', 'Password is required.').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() })
		}

		const { email, password } = req.body

		try {
			if (!email || !password) {
				res.status(401).json({
					error: 'Please provide email and password.',
				})
			}

			const user = await User.findOne({ email }).select('+password')

			if (!user) {
				res.status(404).json({ error: 'Invalid Credentials.' })
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				res.status(404).json({ error: 'Invalid Credentials.' })
			}

			const payload = {
				user: {
					id: user._id,
				},
			}

			const token = jwt.sign(payload, process.env.JWTSECRET)
			res.status(200).json({ token })
		} catch (err) {
			console.log(err.message)
			res.status(500).send('Server error')
		}
	}
)

module.exports = router
