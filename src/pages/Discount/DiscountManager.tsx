import WrapperPageAdmin from '@/components/common/WrapperPageAdmin';
import TableDisplay from '@/components/TableDisplay';
import useFilter from '@/hooks/common/useFilter';
import useGetAllDiscount from '@/hooks/discount/queries/useGetAllDiscount';
import { DiscountColumnsType, DiscountTableColumns } from './components/DiscountColumnsTable';
import { useMemo } from 'react';
import useTable from '@/hooks/common/useTable';

const DiscountManager = () => {
    const { query } = useFilter();
    const { data: discountRes } = useGetAllDiscount(query);
    const discounts = useMemo(() => discountRes?.data, [discountRes]);
    const { onFilter, onSelectPaginateChange } = useTable<DiscountColumnsType>();

    return (
        <WrapperPageAdmin title='Quản lý khuyến mãi'>
            <TableDisplay<DiscountColumnsType>
                currentPage={Number(query.page || 1)}
                dataSource={discounts}
                columns={DiscountTableColumns() || []}
                onFilter={onFilter}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={discountRes?.totalDocs}
            />
            <></>
        </WrapperPageAdmin>
    );
};

export default DiscountManager;
