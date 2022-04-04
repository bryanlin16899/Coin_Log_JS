import React, { useState } from 'react'
import { FaBitcoin } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import { signOutUser } from '../../actions/user'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'

function Navbar({ signOutUser, setAlert, user: { isAuth } }) {
	const [ticker, setTicker] = useState('')

	let navigate = useNavigate()

	const onSubmit = (e) => {
		e.preventDefault()

		if (ticker === '') {
			setAlert('Please enter valid ticker.')
		} else {
			navigate(`/dashboard/${ticker}`)
			setTicker('')
		}
	}

	const authLinks = (
		<div className="flex-none">
			<ul className="menu menu-horizontal p-0">
				<li>
					<div className="hidden md:flex form-control">
						<form onSubmit={onSubmit}>
							<input
								type="text"
								placeholder="Search Ticker"
								className="input input-bordered"
								name={ticker}
								onChange={(e) => {
									setTicker(e.target.value)
								}}
							></input>
						</form>
					</div>
				</li>
				<li>
					<Link to="/" className="hidden md:flex hover:text-warning">
						News
					</Link>
				</li>
				<li>
					<Link
						to="/dashboard/BTCUSDT"
						className="hidden md:flex hover:text-warning"
					>
						Dashboard
					</Link>
				</li>
				<li>
					<Link to="#" className="hidden md:flex hover:text-warning">
						Setting
					</Link>
				</li>
				<li>
					<a onClick={signOutUser} className="hidden md:flex over:text-warning">
						SignOut
					</a>
				</li>
			</ul>
			<div className="md:hidden flex items-center">
				<div className="dropdown dropdown-end">
					<label tabIndex="0" className="btn m-1">
						<svg
							className="w-6 h-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex="0"
						className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
					>
						<li>
							<Link className="hover:text-warning" to="/">
								News
							</Link>
						</li>
						<li>
							<Link to="/dashboard/BTCUSDT" className="hover:text-warning">
								Dashboard
							</Link>
						</li>
						<li>
							<Link to="#" className="hover:text-warning">
								Setting
							</Link>
						</li>
						<li>
							<a onClick={signOutUser} className="over:text-warning">
								SignOut
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="mobile-menu hidden md:hidden"></div>
		</div>
	)

	const guestLinks = (
		<div className="flex-none">
			<ul className="menu menu-horizontal p-0">
				<li>
					<Link to="/signin" className="hidden md:flex hover:text-warning">
						SignIn
					</Link>
				</li>
				<li>
					<Link
						to="/signup"
						className="hidden md:flex bg-primary text-black hover:bg-yellow-300 text-yellow-800"
					>
						SignUp
					</Link>
				</li>
			</ul>
			<div className="md:hidden flex items-center">
				<div className="dropdown dropdown-end">
					<label tabIndex="0" className="btn m-1">
						<svg
							className="w-6 h-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex="0"
						className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
					>
						<li>
							<Link to="/signin">SignIn</Link>
						</li>
						<li>
							<Link
								to="/signup"
								className="flex bg-primary text-black hover:bg-yellow-300 text-yellow-800"
							>
								SignUp
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="mobile-menu hidden md:hidden"></div>
		</div>
	)

	return (
		<nav className="navbar mb-0 shadow-lg bg-neutral text-neutral-content">
			<div className="flex-1">
				<Link to="/" className="text-lg font-bold align-middle px-5">
					<FaBitcoin className="inline pr-2 text-5xl" />
					<span className="text-warning">Coin</span> Log
				</Link>
			</div>
			{isAuth ? authLinks : guestLinks}
		</nav>
	)
}

Navbar.propTypes = {
	signOutUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps, { signOutUser, setAlert })(Navbar)
