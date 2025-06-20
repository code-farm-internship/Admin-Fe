import { TANSTACK_QUERY_KEYS } from '@/constants/queryKeys';
import { discountService } from '@/services/discount.service';
import { useQuery } from '@tanstack/react-query';

const useGetDetailDiscount = (id: string) => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.DISCOUNT.DETAIL, id],
        queryFn: () => discountService.getDetailDiscount(id),
        enabled: !!id,
    });
};

export default useGetDetailDiscount;
