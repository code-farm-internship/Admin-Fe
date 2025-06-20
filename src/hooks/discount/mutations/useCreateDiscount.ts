import { TANSTACK_QUERY_KEYS } from '@/constants/queryKeys';
import { useToast } from '@/contexts/ToastProvider';
import { discountService } from '@/services/discount.service';
import { IDiscountPayload } from '@/types/discount';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useCreateDiscount = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [TANSTACK_QUERY_KEYS.DISCOUNT.CREATE],
        mutationFn: (body: IDiscountPayload) => discountService.createDiscount(body),
        onSuccess() {
            toast('success', 'Thêm giảm giá thành công');
            void queryClient.invalidateQueries({
                predicate(query) {
                    return query.queryKey.includes(TANSTACK_QUERY_KEYS.DISCOUNT.GET_ALL);
                },
            });
            navigate('/admin/discount');
        },
        onError() {
            toast('error', 'Thêm sản phẩm thất bại');
        },
    });
};

export default useCreateDiscount;
