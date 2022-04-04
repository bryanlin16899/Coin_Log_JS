import React from 'react'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'
import PropTypes from 'prop-types'

function SideBarItem({ coin }) {
	return (
		<>
			<tr>
				<td className="p-2">
					<div
						className="tooltip tooltip-right"
						data-tip={coin.symbol.toUpperCase()}
					>
						<img src={coin.image} width={23} alt={coin.symbol}></img>
					</div>
				</td>
				<td className="p-2 w-1">{coin.current_price}</td>
				{coin.price_change_percentage_24h > 0 ? (
					<td className="p-1">
						<BiUpArrow color="green" />
					</td>
				) : (
					<td className="p-1">
						<BiDownArrow color="red" />
					</td>
				)}
				<td className="p-3">{coin.price_change_percentage_24h.toFixed(2)} %</td>
			</tr>
		</>
	)
}

SideBarItem.propTypes = {
	coin: PropTypes.object.isRequired,
}

export default SideBarItem
