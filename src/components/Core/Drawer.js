/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-03-04 15:12:36
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { confirmable, createConfirmation } from 'react-confirm';

import { Button, Drawer, Form, Modal } from 'antd';

import wrapperStore from 'src/redux';

const propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	show: PropTypes.bool,
	proceed: PropTypes.func, // called when ok button is clicked.
	dismiss: PropTypes.func, // called when dismiss button is clicked.
	drawerOptions: PropTypes.object,
	formProps: PropTypes.object,
	data: PropTypes.object,
	callback: PropTypes.func,
	onSubmit: PropTypes.func,
	fields: PropTypes.array,
	children: PropTypes.any,
	width: PropTypes.any,
};

const defaultProps = {
	title: '',
	message: '',
	drawerOptions: {},
	formProps: {},
	callback: f => f,
	onSubmit: f => f,
	dismiss: f => f,
	proceed: f => f,
	data: {},
	fields: [],
	children: null,
	width: 500,
};

const DrawerCpn = (props) => {
	const { title, message, show, width, proceed, drawerOptions, formProps, callback, onSubmit, data, fields, dismiss, children } = props;

	const [handing, setHanding] = React.useState(false);
	const [visible, setVisible] = React.useState(false);

	const [form] = Form.useForm();

	React.useEffect(() => {
		if (!data) return;

		if (show || visible) {
			form.setFieldsValue({
				...data,
			});
		}
	}, [data, form, show, visible]);

	const handleShowModal = React.useCallback(() => {
		setVisible(true);
	}, []);

	const handleCancel = React.useCallback(() => {
		form.resetFields();
		setVisible(false);
	}, [form]);

	const handleSubmit = React.useCallback(async (values) => {
		Modal.confirm({
			title: 'Are you sure?',
			onOk: async () => {
				setHanding(true);

				try {
					const res = await onSubmit(values, form);

					if (show) {
						form.resetFields();
						await callback(res);

						proceed(res);
					} else {
						handleCancel();
					}
				} finally {
					setHanding(false);
				}
			},
		});
	}, [callback, form, handleCancel, onSubmit, proceed, show]);

	return (
		<>
			{
				!show &&
				<>
					{
						children ?
							React.Children.map(children, child => {
								return React.cloneElement(child, { onClick: handleShowModal });
							}) :
							<Button type="primary" onClick={handleShowModal}>Add New </Button>
					}
				</>
			}
			<Drawer
				placement="right"
				width={width}
				closable={false}
				bodyStyle={{ paddingBottom: 80 }}
				{...drawerOptions}
				destroyOnClose
				title={title}
				visible={show || visible}
				footer={
					<div
						style={{
							textAlign: 'right',
						}}
					>
						<Button disabled={handing} onClick={show ? dismiss : handleCancel} style={{ marginRight: 8 }}>
							Cancel
						</Button>
						<Button loading={handing} type="primary" onClick={form.submit}>
							Submit
						</Button>
					</div>
				}
			>
				{message}
				{
					(visible || show) &&
					<Form
						{...formProps}
						form={form}
						onFinish={handleSubmit}
					>
						{
							fields.map((el) => {
								const { node, onChange, ...rest } = el;

								return (
									<Form.Item
										key={el.name}
										className="d-block"
										hasFeedback
										{...rest}
									>
										{
											React.cloneElement(
												node,
												{
													...(onChange ? {
														onChange: (v) => {
															onChange?.(v, form);
														},
													} : {}),
												},
											)
										}
									</Form.Item>
								);
							})
						}
					</Form>
				}
			</Drawer>
		</>
	);
};

DrawerCpn.propTypes = propTypes;

DrawerCpn.defaultProps = defaultProps;

// eslint-disable-next-line func-names
DrawerCpn.open = function (props, callback) {
	return createConfirmation(confirmable(wrapperStore.withRedux((this))))({
		...props,
		callback,
	});
};

export default DrawerCpn;
