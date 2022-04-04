import React, { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import DashboardTable from '../components/dashboard/DashboardTable'
import spinner from '../asset/Rolling-1s-130px.svg'

import {
	PieChart,
	PieArcSeries,
	PieArcLabel,
	LineChart,
	LineSeries,
	PointSeries,
} from 'reaviz'

import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'

// Redux
import {
	getBalance,
	getRecords,
	getBalanceForUsd,
	getAveragePrice,
} from '../actions/dashboard'
import { getMarketData } from '../actions/sidebar'
import { loadUser } from '../actions/user'

function Dashboard({
	getMarketData,
	loadUser,
	getRecords,
	getBalance,
	getBalanceForUsd,
	getAveragePrice,
	user: { isAuth },
	dashboard: { records, balance, balance_usd, average_price, loading },
}) {
	const param = useParams()

	const dispatch = useDispatch()

	useEffect(() => {
		getMarketData()
		// getAveragePrice(param.symbol)
		loadUser()
		if (isAuth) {
			dispatch({ type: 'CLEAR_AVERAGE_PRICE' })
			getBalance()
			getBalanceForUsd()
			getRecords(param.symbol)
		}
	}, [param])

	if (!isAuth) {
		return <Navigate to="/" />
	}

	const onClick = () => {
		getAveragePrice(param.symbol)
	}

	return (
		<>
			<div className="card absolute float-left w-[500px] shadow-xl border-2 border-gray-800 ">
				<div className="w-[400px] h-[400px]">
					{!loading ? (
						<div className="card-body m-auto">
							<div style={{ position: 'absolute', top: 0, left: 70 }}>
								<PieChart
									width={400}
									height={400}
									data={balance_usd.balanceForUsd}
									series={
										<PieArcSeries
											cornerRadius={4}
											padAngle={0.02}
											padRadius={200}
											doughnut={true}
											label={<PieArcLabel fontSize={15} fontFill={'#FBBD23'} />}
										/>
									}
								/>
							</div>
							<h2 className="text-center text-3xl ml-[140px] mt-[150px]">
								{balance_usd.total}USD
							</h2>
						</div>
					) : (
						<div className="ml-auto mt-[75px] w-1/2">
							<img src={spinner} alt="spinner"></img>
						</div>
					)}
				</div>
			</div>
			<div className="card absolute w-[500px] shadow-xl top-[450px] border-2 border-gray-800">
				<div className="w-[400px] h-[400px]">
					{average_price.data ? (
						<div className="card-body m-auto">
							<h2 className="text-center text-xl ml-[140px]">
								Average Price : {average_price.avg_price}
							</h2>
							<div style={{ position: 'absolute', top: 100, left: 70 }}>
								<LineChart
									width={400}
									height={250}
									data={average_price.data ? average_price.data : []}
									series={<LineSeries symbols={<PointSeries show={true} />} />}
								/>
							</div>
						</div>
					) : (
						<div className="ml-auto mt-[75px] w-1/2">
							<button
								onClick={onClick}
								className="btn btn-primary m-auto h-auto"
							>
								Calculate
							</button>
						</div>
					)}
				</div>
			</div>
			<div className="overflow-x-auto float-right w-1/2 border-2 border-gray-800">
				{!loading ? (
					<table className="table w-full">
						<thead>
							<tr>
								<th></th>
								<th>Date</th>
								<th></th>
								<th>Price</th>
								<th>Amount</th>
								<th>Cost</th>
							</tr>
						</thead>
						<tbody>
							{records.map((record, index) => (
								<DashboardTable
									key={record.record_id}
									record={record}
									index={index}
								/>
							))}
						</tbody>
					</table>
				) : (
					<div className="m-auto mt-[75px] w-1/2">
						<img src={spinner} alt="spinner"></img>
					</div>
				)}
			</div>
		</>
	)
}

Dashboard.protoTypes = {
	getMarketData: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
	getBalance: PropTypes.func.isRequired,
	getBalanceForUsd: PropTypes.func.isRequired,
	getRecords: PropTypes.func.isRequired,
	getAveragePrice: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	dashboard: PropTypes.object.isRequired,
	records: PropTypes.array.isRequired,
	balance: PropTypes.array.isRequired,
	balance_usd: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
	dashboard: state.dashboard,
})

export default connect(mapStateToProps, {
	getBalance,
	getBalanceForUsd,
	getRecords,
	getMarketData,
	loadUser,
	getAveragePrice,
})(Dashboard)
