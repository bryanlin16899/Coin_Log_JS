import React from 'react'

import PropTypes from 'prop-types'

function DashboardTable({ record, index }) {
	return (
		<>
			<tr>
				<th>{index + 1}</th>
				<td>{record.date.split('T')[0]}</td>
				<td>
					{record.isBuyer ? (
						<button className="btn btn-disabled btn-sm btn-accent no-animation">
							Buy
						</button>
					) : (
						<button className="btn btn-disabled btn-sm btn-error no-animation">
							sell
						</button>
					)}
				</td>
				<td>{record.price}</td>
				<td>{record.quantity}</td>
				<td>{record.cost.toFixed(3)}</td>
			</tr>
		</>
	)
}

DashboardTable.propTypes = {
	record: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}

export default DashboardTable
