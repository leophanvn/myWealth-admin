/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:51:30
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import { Input } from 'antd';

import Card from 'src/components/Card';

const NoteWidget = (props) => {
	// const { } = props;
	const [note, setNote] = React.useState(localStorage.getItem('NOTE') || '');

	const handleChangeNote = React.useCallback((val) => {
		setNote(val.target.value);
		localStorage.setItem('NOTE', val.target.value);
	}, []);

	return (
		<Card>
			<strong className="fs-md mb-3">Note</strong>
			<Input.TextArea
				style={{
					height: 715,
					marginTop: 15,
				}}
				bordered={false}
				onChange={handleChangeNote}
				value={note}
				placeholder="Write something here..."
			/>
		</Card>
	);
};

NoteWidget.propTypes = {
	// classes: PropTypes.object.isRequired,
};

NoteWidget.defaultProps = {
	// classes: {},
};

export default NoteWidget;
