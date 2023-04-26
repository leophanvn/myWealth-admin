/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-26 09:50:42
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { Form, Drawer, Button, Badge } from 'antd';

import InputSearch from 'src/components/Forms/InputSearch';

import { FiFilter } from 'react-icons/fi';

import diff from 'src/utils/count-filter';

const propTypes = {
	value: PropTypes.object,
	initFilter: PropTypes.object,
	onChange: PropTypes.func,
	fields: PropTypes.array,
	extra: PropTypes.array,
};

const defaultProps = {
	value: {},
	initFilter: {},
	onChange: f => f,
	fields: [],
	extra: [],
};

const Filter = (props) => {
	const { onChange, value, fields, extra, initFilter, ...attrs } = props;
	const [visible, setVisible] = React.useState(false);

	const [form] = Form.useForm();
	const [formDrawer] = Form.useForm();

	React.useEffect(() => {
		if (isEmpty(value)) {
			formDrawer.resetFields();
			form.resetFields();
		}
	}, [form, formDrawer, value]);

	const handleChange = React.useCallback((changedValues, allValues = {}) => {
		onChange({
			...value,
			...allValues,
		});
	}, [value, onChange]);

	const handleCancel = React.useCallback(() => {
		onChange({});
		setTimeout(() => {
			formDrawer.resetFields();
			form.resetFields();
		}, 500);
		setVisible(false);
	}, [form, formDrawer, onChange]);

	const handleFilter = React.useCallback(async (values) => {
		onChange({
			...value,
			...values,
		});
		setVisible(false);
	}, [value, onChange]);

	return (
		<>
			<Form
				{...attrs}
				layout="inline"
				form={form}
				name="main"
				// onFinishFailed={onFinishFailed}
				onValuesChange={handleChange}
				initialValues={{
					...value,
				}}
			>
				<Form.Item
					label=""
					name="q"
					className="mr-2"
				>
					<InputSearch placeholder="Enter text to search..." />
				</Form.Item>
				{
					extra.map((el) => {
						if (!el) {
							return null;
						}
						const { node, onChange: changeFnc, ...rest } = el;

						return (
							<Form.Item
								key={el.name}
								className="mr-2"
								{...rest}
							>
								{
									React.cloneElement(
										node,
										{
											...(changeFnc ? {
												onChange: (v) => {
													changeFnc?.(v, form);
												},
											} : {}),
										},
									)
								}
							</Form.Item>
						);
					})
				}
				{
					fields.length > 0 &&
					<Form.Item className="mr-0">
						<Badge count={diff(initFilter, value)} size="small">
							<Button type="primary" icon={<FiFilter style={{ marginTop: 5 }} />} onClick={() => setVisible(true)} />
						</Badge>
					</Form.Item>
				}
			</Form>

			{
				fields.length > 0 &&
				<Drawer
					title="Filter"
					placement="right"
					visible={visible}
					onClose={() => setVisible(false)}
					bodyStyle={{ paddingBottom: 80 }}
					footer={
						<div
							style={{
								textAlign: 'right',
							}}
						>
							<Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>
								Cancel
							</Button>
							<Button type="primary" danger onClick={handleCancel} style={{ marginRight: 8 }}>
								Clear
							</Button>
							<Button type="primary" onClick={formDrawer.submit}>
								Filter
							</Button>
						</div>
					}
				>
					<Form
						form={formDrawer}
						autoComplete="off"
						name="drawer"
						onFinish={handleFilter}
						initialValues={{
							...value,
						}}
					>
						{
							fields.map((el) => {
								if (!el) {
									return null;
								}
								const { node, onChange: changeFnc, ...rest } = el;

								return (
									<Form.Item
										key={el.name}
										className="d-block"
										{...rest}
									>
										{
											React.cloneElement(
												node,
												{
													...(changeFnc ? {
														onChange: (v) => {
															changeFnc?.(v, formDrawer);
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
				</Drawer>
			}
		</>
	);
};

Filter.propTypes = propTypes;

Filter.defaultProps = defaultProps;

export default Filter;
