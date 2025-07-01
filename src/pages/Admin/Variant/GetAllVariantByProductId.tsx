import WrapperPageAdmin from '@/components/common/WrapperPageAdmin';
import useFilter from '@/hooks/common/useFilter';
import useGetAllVariant from '@/hooks/variant/useGetAllVariant';
import { DiscountType } from '@/types/discount';
import { IVariantTableItem } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Space, Table, TableProps } from 'antd';
import { Button } from 'antd/lib';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VariantTableColumns from './components/VariantTableColumns';
import { PRIVATE_ROUTES } from '@/constants/routes';

type OnChange = NonNullable<TableProps<IVariantTableItem>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const GetAllVariantByProductId = () => {
    const { productId } = useParams();
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});
    const navigate = useNavigate();

    const { data, isLoading } = useGetAllVariant(productId as string);

    const variantData = useMemo(
        () =>
            data?.variants.map((v) => {
                return {
                    format: v.formatId.name,
                    discountType: v.discountId?.discountType,
                    image: v.image,
                    discountValue: v.discountId?.discountValue,
                    price: v.price,
                    stock: v.stock,
                    _id: v._id,
                };
            }),
        [data?.variants]
    );

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const handleChange: OnChange = (_, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };
    return (
        <WrapperPageAdmin title='Quản lý biến thể' option={<></>}>
            <div>
                <div className='mb-2 flex justify-between'>
                    <div className='flex gap-2'>
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() => {
                                navigate(`/${PRIVATE_ROUTES.VARIANT.CREATE}/${productId}`);
                            }}
                            type='primary'
                            size='middle'
                        >
                            Thêm mới biến thể
                        </Button>
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() => {
                                navigate(`/${PRIVATE_ROUTES.VARIANT.UPDATE}/${productId}`);
                            }}
                            type='primary'
                            size='middle'
                        >
                            Cập nhật biến thể
                        </Button>
                    </div>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={clearAll}
                        className='hover:border-primary/60 hover:text-primary/80 transition-colors'
                        size='middle'
                    >
                        Đặt lại bộ lọc
                    </Button>
                </div>
                <Table<IVariantTableItem>
                    rowKey={(item) => item._id}
                    onChange={handleChange}
                    columns={VariantTableColumns({ filteredInfo, sortedInfo, variantData: variantData ?? [] })}
                    dataSource={variantData}
                    loading={isLoading}
                />
            </div>
        </WrapperPageAdmin>
    );
};

export default GetAllVariantByProductId;
