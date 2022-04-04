import React, { useEffect } from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getMarketData } from '../actions/sidebar'
import { loadUser } from '../actions/user'

function News({ getMarketData, loadUser }) {
	useEffect(() => {
		getMarketData()
		loadUser()
		const intervalid = setInterval(() => {
			getMarketData()
		}, 30000)
		return () => {
			clearInterval(intervalid)
		}
	}, [])

	return (
		<div className="card w-96 bg-base-100 shadow-xl w-flex">
			<figure>
				<img
					src="https://images.unsplash.com/photo-1641580529558-a96cf6efbc72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
					alt="Shoes"
				></img>
			</figure>
			<div className="card-body">
				<h2 className="card-title">3/12 Market Wrap</h2>
				<p>
					Price gains were short-lived, although some analysts expect a relief
					rally if war-related conditions ease.
				</p>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">View</button>
				</div>
			</div>
		</div>
	)
}

News.propTypes = {
	getMarketData: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, { getMarketData, loadUser })(News)
