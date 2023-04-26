/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-03-03 14:51:00
*------------------------------------------------------- */

import React from 'react';
import dynamic from 'next/dynamic';

import Loading from 'src/components/Loading';

const RichTextEditor = dynamic(
	() => import('./BraftEditor'),
	{
		ssr: false,
		loading: () => (
			<div
				className="px-5 text-center"
			>
				<Loading loading />
			</div>
		),
	},
);

export default RichTextEditor;
