import { useToast } from '@/contexts/ToastProvider';
import { variantService } from '@/services/variant.service';
import { IErrorResponse } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateVariant = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['create-variant'],
        mutationFn: (body: FormData) => variantService.createVariant(body),
        onSuccess() {
            toast('success', 'Thêm biển thể thành công');
            queryClient.invalidateQueries({ queryKey: ['variants'] });
        },
        onError(error: IErrorResponse) {
            toast('error', error.response.data.message);
        },
    });
};

export default useCreateVariant;
