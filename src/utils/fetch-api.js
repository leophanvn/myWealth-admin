/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* --------------------------------------------------------
*
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-09-28 22:42:09
*------------------------------------------------------- */

// import merge from 'lodash/merge';
// import queryString from 'query-string';
import { actionLogout } from 'src/redux/actions/auth';

import axios from 'axios';

import { notification } from 'antd';

import Router from 'next/router';

import CONSTANTS from 'src/constants/urls';

import AuthStorage from './auth-storage';

const mandatory = () => {
	return Promise.reject(new Error('Fetch API Missing parameter!'));
};

const { API_URL } = CONSTANTS;

const axiosInstance = axios.create({
	baseURL: API_URL,
	timeout: 300000,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.defaults.timeout = 300000;

export const setupInterceptors = (store) => {
	axiosInstance.interceptors.request.use(
		(config) => {
			// set token
			if (AuthStorage.accessToken) {
				// eslint-disable-next-line no-param-reassign
				config.headers.Authorization = 'Bearer ' + AuthStorage.accessToken;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);
	const { dispatch } = store;
	axiosInstance.interceptors.response.use(
		(res) => {
			return res;
		},
		async (err) => {
			const originalConfig = err.config;

			if (originalConfig.url !== '/users/logout' && err.response && AuthStorage.refreshToken) {
				// Access Token was expired
				if (err.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;

					try {
						const rs = await axios.post(API_URL + '/users/refresh-token', {
							refreshToken: AuthStorage.refreshToken,
							timeout: 300000,
						});

						const { accessToken } = rs.data;

						AuthStorage.value = {
							...AuthStorage.value,
							accessToken,
						};

						return axiosInstance(originalConfig);
					} catch (_error) {
						const { response } = _error;

						if (response?.data?.status === 401 || response?.data?.code === 'INVALID_REFRESH_TOKEN') {
							await dispatch(await actionLogout(() => {
								if (process.browser) {
									Router.push('/login');
								}
							}));
						}

						return Promise.reject(response?.data || _error);
					}
				}
			}

			return Promise.reject(err?.response?.data || err);
		},
	);
};

const fetchApi = async ({ url, options = { headers: {}, method: 'GET' }, payload = {}, dispatch = f => f } = mandatory(), cb = f => f) => {
	const { method = 'GET', headers = {} } = options;

	try {
		if (process.env.NODE_ENV === 'development') {
			console.log('------');
			console.log('Call API: url, options, payload', url, options, payload);
		}

		if (headers && Object.keys(headers).length > 0) {
			axiosInstance.defaults.headers = {
				...axiosInstance.defaults.headers,
				...headers,
			};
		} else {
			axiosInstance.defaults.headers = {
				'Content-Type': 'application/json',
			};
		}

		const response = await axiosInstance?.[method?.toLowerCase() || 'get']?.(url, payload);

		if (process.env.NODE_ENV === 'development') {
			console.log('------');
		}

		if (response.status === 204 || response.statusText === 'No Content') {
			cb(null, {});
			return {};
		}

		if (response.status !== 200) {
			throw response;
		}

		const { data = {} } = response;

		cb(null, data);
		return data;
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.log('Call API Error: ', error);
		}

		if (process.browser) {
			notification.error({
				message: 'Oops!',
				description: (error?.message || 'Server is not working properly! Please try again later.'),
			});
		}

		// if ((error.status === 403 || error.status === 401) || error.code === 'AUTHORIZATION_REQUIRED') {
		// 	AuthStorage.destroy();
		// 	dispatch({ type: 'LOGOUT_SUCCESS' });
		// 	if (process.browser) {
		// 		Router.push('/login');
		// 	}
		// }

		cb(error);
		throw error;
	}
};

export default fetchApi;
