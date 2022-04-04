import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

const initialState = {
	msg: null,
	type: null,
}

export default function (state = initialState, action) {
	const { type, payload } = action

	switch (type) {
		case SET_ALERT:
			return payload
		case REMOVE_ALERT:
			return initialState
		default:
			return state
	}
}
