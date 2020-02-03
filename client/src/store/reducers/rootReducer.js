import authReducer from './authReducer'
import taskReducer from './taskReducer'
import messageReducer from './messageReducer'
import {combineReducers} from 'redux'

const rootReducer=combineReducers({
  auth:authReducer,
  tasks:taskReducer,
  message:messageReducer,
});

export default rootReducer