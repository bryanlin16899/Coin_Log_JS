import React, { useContext, useEffect } from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

// Redux
import { clearMarket } from '../actions/sidebar'
import { connect } from 'react-redux'

function Notfound({ clearMarket }) {
	useEffect(() => {
		clearMarket()
	}, [])

	return (
		<div className="hero mt-10">
			<div className="text-center hero-content">
				<div className="max-w-lg">
					<h1 className="text-8xl font-bold mb-8">Oops!</h1>
					<p className="text-5xl mb-8">404 - Page not found!</p>
					<Link className="btn btn-primary btn-lg" to="/">
						<FaHome className="mr-2 text-3xl" />
						Back To Home
					</Link>
				</div>
			</div>
		</div>
	)
}

Notfound.propTypes = {
	clearMarket: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, { clearMarket })(Notfound)
