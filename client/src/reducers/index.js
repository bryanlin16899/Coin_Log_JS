import { combineReducers } from 'redux'
import sidebar from './sidebar'
import user from './user'
import alert from './alert'
import dashboard from './dashboard'

export default combineReducers({ sidebar, user, alert, dashboard })
