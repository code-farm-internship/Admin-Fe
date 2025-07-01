import { useToast } from '@/contexts/ToastProvider';
import { variantService } from '@/services/variant.service';
import { IErrorResponse } from '@/types/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateVariant = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['update-variant'],
        mutationFn: (body: FormData) => variantService.updateVariant(body),
        onSuccess() {
            toast('success', 'Cập nhật thể thành công');
            queryClient.invalidateQueries({ queryKey: ['variants'] });
        },
        onError(error: IErrorResponse) {
            toast('error', error.response.data.message);
        },
    });
};

export default useUpdateVariant;
