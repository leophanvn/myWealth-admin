/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-03-01 10:33:29
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';

import { getOne as getOneUser } from 'src/redux/actions/users';

import ProfileData from 'src/components/ProfileData';
import Loading from 'src/components/Loading';
import Head from 'src/components/Head';

const propTypes = {
	// id: PropTypes.string.isRequired,
};

const defaultProps = {
	// id: '',
};

const Profile = (props) => {
	const router = useRouter();

	const { profileId } = router.query || {};

	const dispatch = useDispatch();

	const { value: data = {}, loading, retry } = useAsyncRetry(async () => {
		if (!profileId) {
			return {};
		}

		const id = profileId.replace('user', '');

		const response = await dispatch(await getOneUser({
			id,
			// filter: {
			// 	include: [
			// 		{
			// 			relation: 'creator',
			// 			scope: {
			// 				fields: ['id', 'fullName', 'avatar', 'email', 'phone', 'role'],
			// 			},
			// 		},
			// 	],
			// },
		}));

		return response;
	}, [profileId]);

	return (
		<div className="">
			<Head title={data.fullName + ' | ' + (data.role || 'Student') + ' Profile'} />

			<Loading loading={loading} />
			<ProfileData
				loading={loading}
				userData={data}
				onRefresh={retry}
			/>
		</div>
	);
};

Profile.propTypes = propTypes;

Profile.defaultProps = defaultProps;

export default Profile;
