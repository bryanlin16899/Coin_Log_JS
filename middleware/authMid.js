const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token')

	if (!token) {
		return res
			.status(401)
			.json({ error: 'No token, authorization denied.' })
	}

	// Verify token
	try {
		const decode = jwt.verify(token, process.env.JWTSECRET)

		req.user = decode.user

		next()
	} catch (err) {
		res.status(401).json({ success: false, msg: 'Token is not valid.' })
	}
}
