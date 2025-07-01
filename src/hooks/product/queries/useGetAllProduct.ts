import { getAllProductsVariant } from '@/services/product.service';
import { IParams } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const useGetAllProduct = (params: IParams) => {
    return useQuery({
        queryKey: ['product', ...Object.values(params)],
        queryFn: () => getAllProductsVariant(params),
    });
};

export default useGetAllProduct;
