const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const router = express.Router()

// @route    POST api/v1/users
// @desc     Register user
// @access   Public
router.post(
	'/',
	[
		check('email', 'Please add a valid email.').isEmail(),
		check(
			'password',
			'Please add a password with 6 or more characters.'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email } = req.body

		try {
			let user = await User.findOne({ email })
			if (user) {
				return res.status(400).json({
					errors: [{ msg: 'User already exists.' }],
				})
			}

			user = await User.create(req.body)

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
