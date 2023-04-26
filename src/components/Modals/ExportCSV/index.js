/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-27 10:05:21
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Button, Checkbox, Row, Col } from 'antd';

const propTypes = {
	fieldsExport: PropTypes.array.isRequired,
	onOk: PropTypes.func,
	loading: PropTypes.bool,
	className: PropTypes.string,
};

const defaultProps = {
	onOk: f => f,
	loading: false,
	className: '',
};

const ModalExportCSV = (props) => {
	const { fieldsExport = [], loading, onOk, className } = props;

	const defaultValue = React.useMemo(() => {
		return fieldsExport.filter(el => {
			return el.checked;
		});
	}, [fieldsExport]);

	const [visible, setVisible] = React.useState(false);
	const [checkedValues, setCheckedValues] = React.useState(defaultValue);

	const handleOk = React.useCallback(() => {
		onOk(checkedValues);
		setVisible(false);
	}, [checkedValues, onOk]);

	const handleSelect = React.useCallback((vals) => {
		setCheckedValues(vals);
	}, []);

	return (
		<>
			<Button loading={loading} type="primary" className={className} danger onClick={() => setVisible(true)}>Export CSV</Button>
			<Modal
				title="Chọn thông tin muốn xuất"
				visible={visible}
				onOk={handleOk}
				onCancel={() => setVisible(false)}
			>
				<Checkbox.Group style={{ width: '100%' }} onChange={handleSelect} defaultValue={defaultValue}>
					<Row>
						{
							fieldsExport.map((field) => {
								return <Col span={12} key={field.key} style={{ margin: '10px 0' }}><Checkbox value={field}>{field.name}</Checkbox></Col>;
							})
						}
					</Row>
				</Checkbox.Group>
			</Modal>
		</>
	);
};

ModalExportCSV.propTypes = propTypes;

ModalExportCSV.defaultProps = defaultProps;

export default ModalExportCSV;
