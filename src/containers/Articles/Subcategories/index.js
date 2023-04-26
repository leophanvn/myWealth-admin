/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-01-14 23:07:23
*------------------------------------------------------- */

import React from 'react';
// import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import useAsyncRetry from 'react-use/lib/useAsyncRetry';
import Router, { useRouter } from 'next/router';

import { Space, Typography } from 'antd';

import { getList } from 'src/redux/actions/subcategory';

import formatDate from 'src/utils/format-date';
import buildUrl from 'src/utils/build-url';

import Table from 'src/components/Core/Table';
import PageHeader from 'src/components/Core/PageHeader';
import Filter from 'src/components/Core/Filter';
import SelectStatus from 'src/components/Forms/SelectStatusPublic';
import Status from 'src/components/Forms/SelectStatusPublic/Display';
import SelectCategory from 'src/components/Forms/SelectCategory';

import Upsert from './Upsert';

const propTypes = {
	// classes: PropTypes.object.isRequired,
};

const defaultProps = {
	// classes: {},
};

const Subcategories = () => {
	// const { } = props;
	const router = useRouter();

	const { query = {} } = router;

	const filterInit = React.useMemo(() => {
		return {
			skip: 0,
			limit: 10,
			where: {},
			include: [
				{
					relation: 'parentCategory',
				},
			],
		};
	}, []);

	const dispatch = useDispatch();

	const { value: list = {}, loading, retry } = useAsyncRetry(async () => {
		const { skip = 0, ...restQuery } = query || {};

		const where = Object.entries(restQuery).reduce((preVal, [key, val]) => {
			if (val && val !== 'all') {
				if (key === 'q') {
					return {
						...preVal,
						or: [
							{ name: { regexp: `/${val}/i` } },
							{ desc: { regexp: `/${val}/i` } },
						],
					};
				}

				return {
					...preVal,
					[key]: val,
				};
			}

			return preVal;
		}, {});

		const response = await dispatch(await getList({
			firstLoad: true,
			filter: {
				...filterInit,
				skip,
				where: {
					...filterInit.where,
					...where,
				},
			},
		}));

		return response;
	}, [router.asPath]);

	const handleChangeFilter = React.useCallback((data) => {
		Router.push(buildUrl({ ...data, skip: '' }), undefined, { shallow: true });
	}, []);

	const handleChangeTable = React.useCallback((sk) => {
		Router.push(buildUrl({ ...query, skip: sk }), undefined, { shallow: true });
	}, [query]);

	return (
		<div className="">
			<PageHeader title="Subcategories">
				<Filter
					onChange={handleChangeFilter}
					value={query}
					initFilter={{
						state: undefined,
						parentCategoryId: undefined,
					}}
					fields={[
						{
							label: 'State',
							name: 'state',
							node: (
								<SelectStatus />
							),
						},
						{
							label: 'Parent Category',
							name: 'parentCategoryId',
							node: (
								<SelectCategory />
							),
						},
					]}
				/>
				<div className="ml-2">
					<Upsert onRefresh={() => { handleChangeFilter(); retry(); }} />
				</div>
			</PageHeader>
			<Table
				loading={loading}
				onChange={handleChangeTable}
				dataSource={list.data}
				skip={query.skip}
				total={list.total}
				limit={list.limit || filterInit.limit}
				columns={[
					{
						title: 'Name',
						dataIndex: 'name',
						key: 'name',
						width: 350,
						render: (val, row) => {
							return (
								<div>
									<div className="mb-1">
										<Upsert data={row} onRefresh={retry}>
											<strong><a>{val}</a></strong>
										</Upsert>
									</div>
									<div>
										<strong>Created at:</strong> <span className="fs-sm">{formatDate(row.createdAt)}</span>
									</div>
								</div>
							);
						},
					},
					{
						title: 'Description',
						dataIndex: 'desc',
						key: 'desc',
						render: (val) => {
							return (
								<Typography.Paragraph
									ellipsis={{
										rows: 2,
										expandable: true,
										symbol: 'more',
									}}
									className="mb-0"
								>
									{val}
								</Typography.Paragraph>
							);
						},
					},
					{
						title: 'Parent Category',
						dataIndex: 'parentCategoryId',
						key: 'parentCategoryId',
						render: (val, row) => {
							return (
								<strong className="text-primary">
									{row?.parentCategory?.name}
								</strong>
							);
						},
					},
					{
						title: 'State',
						dataIndex: 'state',
						key: 'state',
						render: (val, row) => {
							return (
								<Status value={val} />
							);
						},
					},
					{
						title: 'Action',
						dataIndex: 'action',
						key: 'action',
						align: 'right',
						className: 'pr-3',
						render: (val, row) => {
							return (
								<Space>
									<Upsert data={row} onRefresh={retry}>
										<strong><a>Edit</a></strong>
									</Upsert>
								</Space>
							);
						},
					},
				]}
			/>
		</div>
	);
};

Subcategories.propTypes = propTypes;

Subcategories.defaultProps = defaultProps;

export default Subcategories;
