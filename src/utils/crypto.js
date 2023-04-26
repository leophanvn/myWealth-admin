/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-09-24 11:18:38
*------------------------------------------------------- */

import CryptoJS from 'crypto-js';

export const encrypt = (data, secretKey) => {
	if (!data || !secretKey) {
		throw new Error('SecretKey and data are required');
	}
	try {
		return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
	} catch (error) {
		throw new Error('Bad Request');
	}
};

export const decrypt = (data, secretKey) => {
	if (!data || !secretKey) {
		throw new Error('SecretKey and data are required');
	}
	try {
		const bytes = CryptoJS.AES.decrypt(data, secretKey);
		return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	} catch (error) {
		throw new Error('Bad Request');
	}
};
