import { configureStore } from '@reduxjs/toolkit';
import {reducer as userReducer } from './ducks/user/slice';
import {reducer as extensionsReducer } from './ducks/extensions/slice';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  user: userReducer,
  extensions: extensionsReducer
})
const store = configureStore({
  reducer,
})

export default store