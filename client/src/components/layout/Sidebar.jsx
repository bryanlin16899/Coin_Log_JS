import React from 'react'
import SideBarItem from './SideBarItem'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function Sidebar({ sidebar: { coin_market, market_display } }) {
	if (market_display) {
		return (
			<div className="hidden md:flex ">
				<div className="shadow-lg border-r-2 border-neutral w-60">
					<div className="overflow-x-auto">
						<table className="table table-zebra w-max">
							<tbody>
								{coin_market.map((coin) => (
									<SideBarItem key={coin.id} coin={coin} />
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	} else {
		return <></>
	}
}

Sidebar.propTypes = {
	sidebar: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	sidebar: state.sidebar,
})

export default connect(mapStateToProps)(Sidebar)
