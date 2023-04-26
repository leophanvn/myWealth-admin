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

import { upsert } from 'src/redux/actions/article';

import { Button, Drawer, Form, Input, message, Modal, Select, DatePicker } from 'antd';
import moment from 'src/utils/moment';

import SelectCategory from 'src/components/Forms/SelectCategory';
import SelectSubcategory from 'src/components/Forms/SelectSubcategory';
import UploadFile from 'src/components/Forms/UploadFile';
import SelectStatus from 'src/components/Forms/SelectStatusPublic';
import RichTextEditorQuill from 'src/components/Forms/RichTextEditorQuill';

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
			form.resetFields();

			form.setFieldsValue({
				state: 'draft',
				...data,
				publishedDate: moment(data.publishedDate),
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
		Modal.confirm({
			title: 'Are you sure?',
			onOk: async () => {
				setHanding(true);

				try {
					await dispatch(await upsert({
						id: data.id,
						...values,
						updatedAt: +new Date(),
						publishedDate: +new Date(values.publishedDate),
					}));

					onRefresh();
					message.success('Save successfully');

					// form.resetFields();
					setVisible(false);
				} finally {
					setHanding(false);
				}
			},
		});
	}, [onRefresh, data, dispatch]);

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
				title={data.id ? 'Edit ' : 'Add New '}
				placement="right"
				width="90%"
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
						label="Thumbnail image"
						name="thumbnail"
						className="d-block flex-1"
						rules={[{ required: true, message: 'This field is required' }]}
						hasFeedback
					>
						<UploadFile accept="image/*" />
					</Form.Item>
					<Form.Item
						label="Title"
						name="title"
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
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<SelectStatus />
					</Form.Item>
					<Form.Item
						label="Category"
						name="categoryId"
						className="d-block"
						hasFeedback
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<SelectCategory
							onChange={() => form.setFieldsValue({ subcategoryId: undefined })}
						/>
					</Form.Item>
					<Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.categoryId !== curValues.categoryId}>
						{() => {
							return (
								<>
									{
										!!form.getFieldValue('categoryId') &&
										<Form.Item
											label="Subcategory"
											name="subcategoryId"
											className="d-block"
											rules={[{ required: true, message: 'This field is required' }]}
										>
											<SelectSubcategory
												where={{
													parentCategoryId: form.getFieldValue('categoryId'),
												}}
											/>
										</Form.Item>
									}
								</>
							);
						}}
					</Form.Item>
					<Form.Item
						label="Hashtag"
						name="hashtag"
						className="d-block"
						hasFeedback
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Select
							mode="tags"
							allowClear
							style={{ width: '100%' }}
						/>
					</Form.Item>
					<Form.Item
						label="Published Date"
						name="publishedDate"
						className="d-block"
						hasFeedback
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<DatePicker />
					</Form.Item>
					<Form.Item
						label="Summary"
						name="summary"
						className="d-block"
						hasFeedback
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Input.TextArea rows={4} />
					</Form.Item>
					<Form.Item
						label="Content"
						name="content"
						className="d-block"
						hasFeedback
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<RichTextEditorQuill
							style={{
								height: 800,
							}}
						/>
					</Form.Item>

				</Form>
			</Drawer>
		</>
	);
};

DetailsForm.propTypes = propTypes;

DetailsForm.defaultProps = defaultProps;

export default DetailsForm;
