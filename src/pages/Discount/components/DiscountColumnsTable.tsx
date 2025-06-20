import useTable from '@/hooks/common/useTable';
import { DiscountType } from '@/types/discount';
import { Space, TableProps } from 'antd';
import { Link } from 'react-router-dom';

export type DiscountColumnsType = {
    _id: string;
    discountType: DiscountType;
    discountValue: number;
    startDate: string;
    endDate: string;
};

export const DiscountTableColumns = () => {
    const { getColumnSearchProps, getSortedInfo } = useTable<DiscountColumnsType>();

    const columns: TableProps<DiscountColumnsType>['columns'] = [
        {
            title: 'Loại giảm giá',
            dataIndex: 'discountType',
            key: 'discountType',
            render: (text) => <span>{text == DiscountType.PERCENT ? 'Giảm phần trăm' : 'Giảm cố định'}</span>,
            ...getColumnSearchProps('discountType'),
        },
        {
            title: 'Giá trị giảm giá',
            dataIndex: 'discountValue',
            key: 'discountValue',
            sortOrder: getSortedInfo('discountValue'),
            sorter: (a: any, b: any) => a.sold - b.sold,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Link to={`/admin/discount/edit/${record._id}`}>Cập nhật</Link>
                </Space>
            ),
        },
    ];
    return columns;
};
