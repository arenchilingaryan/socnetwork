import { combineReducers } from 'redux'
import profileReducer from './profile.reducer'
import menuReducer from './menu.reducer'

export default combineReducers({
    profile: profileReducer,
    menu: menuReducer
})
