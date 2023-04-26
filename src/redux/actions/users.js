/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-03-06 01:03:01
*------------------------------------------------------- */

import { SINGLE_API } from 'src/redux/actions/types';
import AuthStorage from 'src/utils/auth-storage';

import applyURIFilter from 'src/utils/apply-url-filter';

export const MODEL_NAME = 'USER';
export const MODEL_PLURAL = 'users';

export const count = async (payload = {}, next) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/${MODEL_PLURAL}/count${applyURIFilter(payload, 'where')}`,
			beforeCallType: 'GET_' + MODEL_NAME + '_DATA_REQUEST',
			successType: 'GET_' + MODEL_NAME + '_DATA_SUCCESS',
			next,
		},
	};
};

export const create = (payload, next) => {
	return {
		type: SINGLE_API,
		payload: {
			url: `/${MODEL_PLURAL}`,
			payload,
			options: { method: 'POST' },
			next,
		},
	};
};

export const upsert = async (payload = {}, next = f => f) => {
	const { id, ...data } = payload;

	return {
		type: SINGLE_API,
		payload: {
			url: id ? `/${MODEL_PLURAL}/${id}` : `/${MODEL_PLURAL}`,
			payload: data,
			options: { method: id ? 'PATCH' : 'POST' },
			successType: id ? 'UPDATE_' + MODEL_NAME + '_SUCCESS' : '',
			next,
		},
	};
};

export const resendInvitation = (payload, next) => {
	if (!AuthStorage.loggedIn || AuthStorage.role !== 'admin') {
		next(new Error('Permission denied!'));
		throw new Error('Permission denied!');
	}

	if (!payload || !payload.email) {
		next(new Error('Email is required!'));
		throw new Error('Email is required!');
	}

	return {
		type: SINGLE_API,
		payload: {
			url: `/${MODEL_PLURAL}/resend-invitation`,
			payload,
			options: { method: 'POST' },
			next,
		},
	};
};

export const update = (payload, next) => {
	const { id, ...rest } = payload;

	return {
		type: SINGLE_API,
		payload: {
			url: `/${MODEL_PLURAL}/${id}`,
			payload: rest,
			options: { method: 'PATCH' },
			successType: AuthStorage.userId === id ? 'UPDATE_PROFILE_SUCCESS' : 'UPDATE_' + MODEL_NAME + '_SUCCESS',
			next,
		},
	};
};

export const getOne = (payload = {}, next) => {
	const { id, filter } = payload;

	return {
		type: SINGLE_API,
		payload: {
			url: `/${MODEL_PLURAL}/${id || 'findOne'}${applyURIFilter(filter)}`,
			beforeCallType: 'GET_' + MODEL_NAME + '_DATA_REQUEST',
			successType: 'GET_' + MODEL_NAME + '_DATA_SUCCESS',
			next,
		},
	};
};

export const getList = async (payload = {}, next) => {
	const { filter, firstLoad } = payload;

	return {
		type: SINGLE_API,
		payload: {
			url: `/${MODEL_PLURAL}${applyURIFilter(filter)}`,
			beforeCallType: firstLoad ? 'GET_' + MODEL_NAME + '_LIST_REQUEST' : '',
			successType: 'GET_' + MODEL_NAME + '_LIST_SUCCESS',
			next,
		},
	};
};

// export const getList = async (payload = {}, next) => {
// 	const { filter } = payload;

// 	const res = await fetchApi({
// 		url: `/${MODEL_PLURAL}${applyURIFilter(filter)}`,
// 	}, next);

// 	return res;
// };

export const remove = (payload, next) => {
	const { id } = payload;

	return {
		type: SINGLE_API,
		payload: {
			url: `/${MODEL_PLURAL}/${id}`,
			payload: id,
			options: { method: 'DELETE' },
			successType: 'DELETE_' + MODEL_NAME + '_SUCCESS',
			next,
		},
	};
};
