import { variantService } from '@/services/variant.service';
import { useQuery } from '@tanstack/react-query';

const useGetAllVariant = (id: string) => {
    return useQuery({
        queryKey: ['variants', id],
        queryFn: () => variantService.getAllVariantByProductId(id),
        enabled: !!id,
    });
};

export default useGetAllVariant;
