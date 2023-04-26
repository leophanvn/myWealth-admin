/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-03-02 23:40:41
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import authStorage from 'src/utils/auth-storage';

import { upsert } from 'src/redux/actions/users';

import { Select, Input, message } from 'antd';

import uploadFileFunc from 'src/utils/upload';

import Upsert from 'src/components/Core/Drawer';
import ImgCropper from 'src/components/Forms/ImgCrop';

const propTypes = {
	data: PropTypes.object.isRequired,
	onRefresh: PropTypes.func,
	userRole: PropTypes.string.isRequired,
};

const defaultProps = {
	data: {},
	onRefresh: f => f,
	userRole: undefined,
};

const DetailsForm = (props) => {
	const { data, onRefresh, userRole, ...attrs } = props;
	const dispatch = useDispatch();

	const handleSubmit = React.useCallback(async (values) => {
		const { avatar, email = '', email2 = '', phone = '', phone2 = '' } = values;

		let newAv = avatar;

		if (newAv?.uid) {
			const fileR = await uploadFileFunc(newAv.originFileObj || newAv, 'avatars');

			newAv = fileR.url;
		}

		await dispatch(await upsert({
			id: data.id,
			...values,
			updatedAt: new Date(),
			role: userRole,
			avatar: newAv,
			email: email.replace(/\s/g, '').toLowerCase(),
			email2: email2.replace(/\s/g, '').toLowerCase(),
			phone: phone.replace(/\s/g, '').toLowerCase(),
			phone2: phone2.replace(/\s/g, '').toLowerCase(),
			...(data.id ? {} : {
				creatorId: authStorage.userId,
			}),
		}));

		await onRefresh();
		message.success('Save successfully');
	}, [onRefresh, data.id, dispatch, userRole]);

	return (
		<Upsert
			{...attrs}
			data={data}
			onSubmit={handleSubmit}
			width={600}
			title="User"
			fields={[
				{
					name: 'avatar',
					node: (
						<ImgCropper />
					),
				},
				{
					label: 'Full name',
					name: 'fullName',
					rules: [{ required: true, message: 'This field is required' }],
					node: (
						<Input />
					),
				},
				{
					label: 'Email',
					name: 'email',
					rules: [{ type: 'email' }, { required: true, message: 'This field is required' }],
					node: (
						<Input disabled={authStorage.userId === data.id} />
					),
				},
				{
					label: 'Phone',
					name: 'phone',
					rules: [{ required: true, message: 'This field is required' }],
					node: (
						<Input />
					),
				},
				{
					label: 'Gender',
					name: 'gender',
					rules: [{ required: true, message: 'This field is required' }],
					node: (
						<Select style={{ width: '100%' }}>
							<Select.Option value="male">Male</Select.Option>
							<Select.Option value="female">Female</Select.Option>
						</Select>
					),
				},
				{
					label: 'Description',
					name: 'desc',
					node: (
						<Input.TextArea rows={4} />
					),
				},
			]}
		/>
	);
};

DetailsForm.propTypes = propTypes;

DetailsForm.defaultProps = defaultProps;

export default DetailsForm;
