/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:51:30
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import dynamic from 'next/dynamic';

import Loading from 'src/components/Loading';
import Card from 'src/components/Card';

const NoteWidget = dynamic(
	() => import('./Note'),
	{
		ssr: false,
		loading: () => (
			<Card>
				<strong className="fs-md mb-3">Note</strong>
				<div className="px-5 text-center position-related">
					<Loading loading />
				</div>
			</Card>
		),
	},
);

export default NoteWidget;
