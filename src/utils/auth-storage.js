/* --------------------------------------------------------

* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-09-28 22:42:09
*------------------------------------------------------- */

import Storage from './storage';

class AuthStorage extends Storage {
	get loggedIn() {
		return !!this.value && !!this.value.accessToken;
	}

	get accessToken() {
		return this.value && this.value.accessToken;
	}

	set accessToken(v) {
		this.value.accessToken = v;
	}

	get refreshToken() {
		return this.value && this.value.refreshToken;
	}

	get userId() {
		return this.value && this.value.userId;
	}

	get role() {
		return this.value && this.value.role;
	}
}

export default new AuthStorage('AUTH');
