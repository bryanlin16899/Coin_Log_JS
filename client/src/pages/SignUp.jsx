import React, { useContext, useEffect, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { Link, Navigate } from 'react-router-dom'
import signUpOverlay from '../asset/signupimg.jpg'

import PropTypes from 'prop-types'

// Redux
import { clearMarket } from '../actions/sidebar'
import { setAlert } from '../actions/alert'
import { signUpUser } from '../actions/user'
import { connect } from 'react-redux'

function SignUp({
	clearMarket,
	setAlert,
	signUpUser,
	user: { isAuth, token },
}) {
	// const { clearMarket } = useContext(SidebarContext)
	// const { setAlert } = useContext(AlertContext)
	// const { signUpUser, isAuth, token } = useContext(UserContext)
	useEffect(() => {
		clearMarket()
	}, [])

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		again: '',
		apiKey: '',
		apiSecret: '',
	})

	const { email, password, again, apiKey, apiSecret } = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()

		let patten =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if (password !== again) {
			setAlert('Password did not match.', 'error')
		} else if (!patten.test(email)) {
			setAlert('Please enter valid email.', 'error')
		} else {
			signUpUser(formData)
		}
	}

	if (isAuth || token) {
		return <Navigate to="/" />
	}

	return (
		<div
			className="hero min-h-screen"
			style={{ backgroundImage: `url(${signUpOverlay})` }}
		>
			<div className="hero-overlay bg-opacity-70"></div>
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Sign up now!</h1>
					<p className="py-6">
						Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
						excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
						a id nisi.
					</p>
				</div>
				<form
					onSubmit={onSubmit}
					className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
				>
					<div className="card-body">
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email *</span>
							</label>
							<input
								type="text"
								placeholder="email"
								className="input input-bordered"
								name="email"
								value={email}
								onChange={onChange}
							></input>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password *</span>
							</label>
							<input
								type="password"
								placeholder="password"
								className="input input-bordered"
								name="password"
								value={password}
								onChange={onChange}
							></input>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">again... *</span>
							</label>
							<input
								type="password"
								className="input input-bordered"
								name="again"
								value={again}
								onChange={onChange}
							></input>
							<label className="label">
								<Link to="/signin" className="label-text-alt link link-hover">
									Have account? Sign In
								</Link>
							</label>
						</div>
						<div
							tabIndex="0"
							className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
						>
							<input type="checkbox" className="peer"></input>
							<div className="collapse-title text-xl font-medium">
								Binance For Trade History
							</div>
							<div className="collapse-content">
								<p className="text-primary">Just reading restriction. </p>
								<p className="text-primary">權限只需 啟用讀取 即可. </p>
								<a
									className="inline text-primary"
									href="https://www.binance.com/zh-TC/support/faq/360002502072"
									target="_blank"
									rel="noreferrer"
								>
									<FaRegQuestionCircle />
								</a>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Api key</span>
									</label>
									<input
										type="text"
										placeholder="key"
										className="input input-bordered"
										name="apiKey"
										value={apiKey}
										onChange={onChange}
									></input>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Secret key</span>
									</label>
									<input
										type="password"
										placeholder="secret"
										className="input input-bordered"
										name="apiSecret"
										value={apiSecret}
										onChange={onChange}
									></input>
								</div>
							</div>
						</div>
						<div className="form-control mt-6">
							<button type="submit" className="btn btn-primary">
								Sign Up
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

SignUp.propTypes = {
	clearMarket: PropTypes.func.isRequired,
	signUpUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps, { clearMarket, signUpUser, setAlert })(
	SignUp
)
