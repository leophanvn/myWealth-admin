/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-01-14 23:07:23
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { upsert } from 'src/redux/actions/subcategory';

import { Button, Drawer, Form, Input, message, Modal } from 'antd';

import SelectStatus from 'src/components/Forms/SelectStatusPublic';
import SelectCategory from 'src/components/Forms/SelectCategory';

const propTypes = {
	data: PropTypes.object.isRequired,
	children: PropTypes.any,
	onRefresh: PropTypes.func,
};

const defaultProps = {
	data: {},
	children: null,
	onRefresh: f => f,
};

const DetailsForm = (props) => {
	const { data, onRefresh, children } = props;
	const [visible, setVisible] = React.useState(false);
	const [handing, setHanding] = React.useState(false);

	const dispatch = useDispatch();

	const [form] = Form.useForm();

	React.useEffect(() => {
		if (!data) return;

		if (visible) {
			form.setFieldsValue({
				state: 'draft',
				...data,
			});
		}
	}, [data, form, visible]);

	const showModal = React.useCallback(() => {
		setVisible(true);
	}, []);

	const handleCancel = React.useCallback(() => {
		form.resetFields();
		setVisible(false);
	}, [form]);

	const handleSubmit = React.useCallback(async (values) => {
		console.log('DEV ~ file: Upsert.js:63 ~ handleSubmit ~ values:', values);
		Modal.confirm({
			title: 'Are you sure?',
			onOk: async () => {
				setHanding(true);

				try {
					await dispatch(await upsert({
						id: data.id,
						...data,
						...values,
						updatedAt: new Date(),
					}));

					onRefresh();
					message.success('Save successfully');

					form.resetFields();
					setVisible(false);
				} finally {
					setHanding(false);
				}
			},
		});
	}, [onRefresh, data, dispatch, form]);

	return (
		<>
			{
				children ?
					React.Children.map(children, child => {
						return React.cloneElement(child, { onClick: showModal });
					}) :
					<Button type="primary" onClick={showModal}>Add New </Button>
			}
			<Drawer
				destroyOnClose
				title={data.id ? 'Edit Subcategory' : 'Add New Subcategory'}
				placement="right"
				width={600}
				closable={false}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
				footer={
					<div
						style={{
							textAlign: 'right',
						}}
					>
						<Button disabled={handing} onClick={handleCancel} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button loading={handing} type="primary" onClick={form.submit}>
							{data.id ? 'Save' : 'Submit'}
						</Button>
					</div>
				}
			>
				<Form
					form={form}
					onFinish={handleSubmit}
				>
					<Form.Item
						label="Subcategory Name"
						name="name"
						className="d-block"
						hasFeedback
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="State"
						name="state"
						className="d-block"
					>
						<SelectStatus />
					</Form.Item>
					<Form.Item
						label="Description"
						name="desc"
						className="d-block"
					>
						<Input.TextArea rows={4} />
					</Form.Item>
					<Form.Item
						label="Parent Category"
						name="parentCategoryId"
						className="d-block"
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<SelectCategory />
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
};

DetailsForm.propTypes = propTypes;

DetailsForm.defaultProps = defaultProps;

export default DetailsForm;
