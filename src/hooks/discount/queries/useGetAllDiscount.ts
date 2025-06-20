import { TANSTACK_QUERY_KEYS } from '@/constants/queryKeys';
import { discountService } from '@/services/discount.service';
import { IParams } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const useGetAllDiscount = (params: IParams) => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.DISCOUNT.GET_ALL, ...Object.values(params)],
        queryFn: () => discountService.getAllDiscount(params),
    });
};

export default useGetAllDiscount;
