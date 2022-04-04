import React, { useContext } from 'react'
// import AlertContext from '../../context/alert/AlertContext'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function Alert({ alert }) {
	// const { alert } = useContext(AlertContext)

	return (
		alert.msg !== null && (
			<p className="flex items-start mb-4">
				{alert.type === 'error' ? (
					<div className="alert alert-error shadow-lg">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>Error: {alert.msg}</span>
						</div>
					</div>
				) : (
					<div className="alert alert-warning shadow-lg">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
							<span>Warning: {alert.msg}</span>
						</div>
					</div>
				)}
			</p>
		)
	)
}

Alert.propTypes = {
	alert: PropTypes.object,
}

const mapStateToProps = (state) => ({
	alert: state.alert,
})

export default connect(mapStateToProps)(Alert)
