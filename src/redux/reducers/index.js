/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-01-07 19:09:21
*------------------------------------------------------- */

import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import auth, { initialState as authInitial } from './auth';
import loader, { initialState as initialLoader } from './loader';

import notification, { initialState as initialNoti } from './notification';

export const initialState = {
	auth: authInitial,
	loader: initialLoader,
	notification: initialNoti,
};

export const whitelist = ['settings'];

const appReducer = combineReducers({
	auth,
	loader,
	notification,
});

const reducers = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
		};
		return nextState;
	}
	return appReducer(action.type === 'LOGOUT_SUCCESS' ? initialState : state, action);
};

export default reducers;
