import { DiscountType } from '@/types/discount';
import { IVariantTableItem } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { TableProps } from 'antd';
import { useMemo } from 'react';

type OnChange = NonNullable<TableProps<IVariantTableItem>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

type VariantTableProps = {
    filteredInfo: Filters;
    sortedInfo: Sorts;
    variantData: IVariantTableItem[];
};

export const VariantTableColumns = ({ filteredInfo, sortedInfo, variantData }: VariantTableProps) => {
    const columns: TableProps<IVariantTableItem>['columns'] = useMemo(
        () => [
            {
                title: 'Ảnh',
                dataIndex: 'image',
                key: 'image',
                render: (_, record) => <img src={record.image} className='w-10' />,
            },
            {
                title: 'Định dạng',
                dataIndex: 'format',
                key: 'format',
                filters: variantData?.map((v) => ({
                    text: v.format,
                    value: v.format,
                })),
                filteredValue: filteredInfo.format || null,
                filterMode: 'tree',
                filterSearch: true,
                onFilter: (value, record) => record.format.startsWith(value as string),
                render: (_, record) => <span className='capitalize'>{record.format}</span>,
            },
            {
                title: 'Giảm giá',
                dataIndex: 'discount',
                key: 'discount',
                sorter: (a, b) => a.discountValue - b.discountValue,
                sortOrder: sortedInfo.columnKey === 'discount' ? sortedInfo.order : null,
                render: (_, record) => (
                    <span className='font-semibold'>
                        {record.discountType === DiscountType.PERCENT
                            ? `${record?.discountValue} %`
                            : record?.discountValue && formatCurrency(record.discountValue)}
                    </span>
                ),
            },

            {
                title: 'Giá',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
                sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
                render: (_, record) => <span className='font-semibold'>{formatCurrency(record.price)}</span>,
            },
            {
                title: 'Số lượng',
                dataIndex: 'stock',
                key: 'stock',
            },
        ],
        [variantData, filteredInfo, sortedInfo]
    );
    return columns;
};

export default VariantTableColumns;
