import { TANSTACK_QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { discountService } from '@/services/discount.service';
import { IDiscountPayload } from '@/types/discount';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useUpdateDiscount = (id: string) => {
    const toast = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [TANSTACK_QUERY_KEYS.DISCOUNT.CREATE],
        mutationFn: (body: IDiscountPayload) => discountService.updateDiscount(body, id),
        onSuccess() {
            toast('success', 'Cập nhật giá thành công');
            void queryClient.invalidateQueries({
                predicate(query) {
                    return query.queryKey.includes(TANSTACK_QUERY_KEYS.DISCOUNT.GET_ALL);
                },
            });
            navigate('/admin/discount');
        },
        onError(error: any) {
            toast('error', error.response.data.message);
        },
    });
};

export default useUpdateDiscount;
