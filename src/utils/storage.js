/* --------------------------------------------------------

* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-09-28 22:42:09
*------------------------------------------------------- */

import cookie from 'react-cookies';

const mandatory = () => {
	throw new Error('Storage Missing parameter!');
};

const configs = {
	path: '/',
	maxAge: 30 * 24 * 60 * 60,
	secure: process.env.NODE_ENV === 'production',
	// domain: '.allsubdomains.com',
	sameSite: 'strict',
};

export default class Storage {
	#name;

	#options = {};

	constructor(name = mandatory(), value = {}, options = {}) {
		this.#name = name;
		this.#options = options;

		if (!this.value) {
			this.value = value;
		}
	}

	set value(value) {
		cookie.save(
			this.#name,
			value,
			{
				...configs,
				...this.#options,
			},
		);
	}

	get value() {
		return cookie.load(this.#name);
	}

	// eslint-disable-next-line class-methods-use-this
	get allCookies() {
		return cookie.loadAll();
	}

	destroy = (next = f => f) => {
		cookie.remove(
			this.#name,
			{
				...configs,
				...this.#options,
			},
		);
		next();
	}
}
