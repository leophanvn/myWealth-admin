/* --------------------------------------------------------
*
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2022-02-12 11:31:55
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { useAsync } from 'react-use';

import { useDispatch } from 'react-redux';

import { Select, Spin } from 'antd';

import { getList, getOne } from 'src/redux/actions/users';

import Avatar from 'src/components/DataEntry/Avatar';

const propTypes = {
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	value: PropTypes.any,
	fields: PropTypes.array,
	returnField: PropTypes.string,
	where: PropTypes.object,
	showalloption: PropTypes.bool,
	mode: PropTypes.string,
};

const defaultProps = {
	onChange: f => f,
	onFocus: f => f,
	value: undefined,
	fields: ['id', 'avatar', 'fullName', 'email'],
	where: {},
	returnField: 'id',
	showalloption: false,
	mode: null,
};

const SelectUser = (props) => {
	const { onChange, onFocus, where, fields, returnField, showalloption, mode, value, ...rest } = props;

	const selectRef = React.useRef(null);
	const initFetch = React.useRef(true);
	const lastFetchId = React.useRef(0);

	const [data, setData] = React.useState([]);
	const [fetching, setFetching] = React.useState(false);
	const [hasMore, setHasMore] = React.useState(true);

	const dispatch = useDispatch();

	const filter = React.useMemo(() => {
		return {
			skip: 0,
			limit: 10,
			fields,
			where: {
				...where,
				status: 'active',
			},
		};
	}, [fields, where]);

	useAsync(async () => {
		if (value && initFetch.current) {
			setFetching(true);

			try {
				if (mode === 'multiple') {
					const res = await dispatch(await getList({
						filter: {
							skip: 0,
							fields,
							where: {
								id: {
									inq: value,
								},
							},
						},
						firstLoad: true,
					}));

					setData(res.data || []);
				} else {
					const res = await dispatch(await getOne({ id: value }));
					setData([res]);
				}
			} finally {
				initFetch.current = false;
				setFetching(false);
			}
		}
	}, [value]);

	const handleGetOptions = React.useCallback(async (v) => {
		lastFetchId.current += 1;
		const fetchId = lastFetchId.current;

		setData([]);
		setFetching(true);
		if (v) {
			const regex = '/' + v + '/i';

			filter.skip = 0;

			filter.where.or = [
				{ id: { regexp: regex } },
				{ phone: { regexp: regex } },
				{ phone2: { regexp: regex } },
				{ fullName: { regexp: regex } },
				{ email: { regexp: regex } },
				{ email2: { regexp: regex } },
			];
		} else {
			filter.skip = 0;

			delete filter.where.or;
		}

		const res = await dispatch(await getList({ filter, firstLoad: true }));

		if (fetchId !== lastFetchId.current) { // for fetch callback order
			return;
		}

		setData(res.data);
		setFetching(false);
		setHasMore(res.skip + res.limit <= res.total);
	}, [dispatch, filter]);

	const handleChange = React.useCallback((v) => {
		setFetching(false);

		if (returnField !== 'id') {
			if (mode === 'multiple') {
				const findsData = data.filter(el => {
					return v.includes(el.id);
				});

				onChange(v, returnField === 'full' ? findsData : findsData.map(el => el[returnField]));

				return;
			}

			const findData = data.find(el => {
				return el.id === v;
			}) || {};

			onChange(v, returnField === 'full' ? findData : findData[returnField]);

			return;
		}

		onChange(v);
	}, [data, mode, onChange, returnField]);

	const handleSelect = React.useCallback(() => {
		selectRef.current.blur();
	}, []);

	const handleScroll = React.useCallback(async (e) => {
		e.persist();
		if (e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight < 1 && hasMore) {
			setFetching(true);

			filter.skip += filter.limit;

			const res = await dispatch(await getList({ filter }));

			setData((preV) => {
				return [...preV, ...res.data];
			});
			setFetching(false);
			setHasMore(res.skip + res.limit <= res.total);
		}
	}, [dispatch, filter, hasMore]);

	const handleSearch = debounce(handleGetOptions, 500);

	return (
		<Select
			ref={selectRef}
			showArrow
			value={value}
			notFoundContent={fetching ? <Spin size="small" /> : 'Not Found'}
			filterOption={false}
			style={{ width: '100%' }}
			allowClear
			optionLabelProp="label"
			showSearch
			defaultActiveFirstOption={false}
			{...rest}
			mode={mode}
			onSearch={handleSearch}
			onFocus={() => handleGetOptions()}
			onChange={handleChange}
			onSelect={handleSelect}
			loading={fetching}
			onPopupScroll={handleScroll}
		>
			{
				showalloption && <Select.Option key="all" value="all">All Teacher</Select.Option>
			}
			{
				data.length > 0 && data.map(el => {
					return (
						<Select.Option key={el.id} value={el.id} label={el.fullName}>
							<div className="d-flex align-items-center">
								<Avatar
									src={el.avatar}
									name={el.fullName}
									size={30}
								/>
								<div className="ml-1">
									<strong>{el.fullName}</strong>
									<div className="fs-xs line-height-1">
										<span>{el.email}</span>
									</div>
								</div>
							</div>
						</Select.Option>
					);
				})
			}
		</Select>
	);
};

SelectUser.propTypes = propTypes;

SelectUser.defaultProps = defaultProps;

export default SelectUser;
