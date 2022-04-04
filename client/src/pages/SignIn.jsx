import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import signInOverlay from '../asset/signinimg.jpg'

import PropTypes from 'prop-types'

// Redux
import { signInUser } from '../actions/user'
import { clearMarket } from '../actions/sidebar'
import { setAlert } from '../actions/alert'
import { connect } from 'react-redux'

function SignIn({
	signInUser,
	user: { isAuth, token },
	clearMarket,
	setAlert,
}) {
	useEffect(() => {
		clearMarket()
	}, [])

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	if (isAuth || token) {
		return <Navigate to="/" />
	}
	const { email, password } = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()

		let patten =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		if (!patten.test(email)) {
			setAlert('Please enter valid email.', 'error')
		} else {
			signInUser(formData)
		}
	}

	return (
		<div
			className="hero min-h-screen"
			style={{ backgroundImage: `url(${signInOverlay})` }}
		>
			<div className="hero-overlay bg-opacity-70"></div>
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Welcome Back.</h1>
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
							<label className="label">
								<Link to="/signup" className="label-text-alt link link-hover">
									Do not have account? Sign Up
								</Link>
							</label>
						</div>
						<div className="form-control mt-6">
							<button type="submit" className="btn btn-primary">
								Sign In
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}

SignIn.propTypes = {
	signInUser: PropTypes.func.isRequired,
	clearMarket: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps, { signInUser, clearMarket, setAlert })(
	SignIn
)
