/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-23 23:29:28
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';

const propTypes = {
	levels: PropTypes.array.isRequired,
	defaultShow: PropTypes.number,
};

const defaultProps = {
	levels: [],
	defaultShow: 3,
};

const DisplayCategory = (props) => {
	const { levels = [], defaultShow } = props;

	if (levels.length === 0) {
		return '--';
	}

	if (defaultShow === 1) {
		const [lv = {}, ...restLv] = levels;

		return (
			<div className="fs-sm">
				<div key={lv?.id} className="class">
					- {lv?.name}
				</div>
				{
					restLv.length > 0 &&
					<Typography.Paragraph
						ellipsis={{
							rows: 1,
							expandable: true,
						}}
					>
						{
							restLv.map((el) => {
								return (
									<div key={el?.id} className="class">
										- {el?.name}
									</div>
								);
							})
						}
					</Typography.Paragraph>
				}
			</div>
		);
	}

	const [lv = {}, lv2 = {}, lv3 = {}, ...restLv] = levels;

	return (
		<div className="fs-sm">
			<div key={lv?.id} className="class">
				- {lv?.name}
			</div>
			{
				lv2.id &&
				<div key={lv2?.id} className="class">
					- {lv2?.name}
				</div>
			}
			{
				lv3.id &&
				<div key={lv3?.id} className="class">
					- {lv3?.name}
				</div>
			}
			{
				restLv.length > 0 &&
				<Typography.Paragraph
					ellipsis={{
						rows: 1,
						expandable: true,
					}}
				>
					{
						restLv.map((el) => {
							return (
								<div key={el?.id} className="class">
									- {el?.name}
								</div>
							);
						})
					}
				</Typography.Paragraph>
			}
		</div>
	);
};

DisplayCategory.propTypes = propTypes;

DisplayCategory.defaultProps = defaultProps;

export default DisplayCategory;
