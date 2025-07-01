import { TANSTACK_QUERY_KEYS } from '@/constants/queryKeys';
import { formatService } from '@/services/format.service';
import { useQuery } from '@tanstack/react-query';

const useGetAllFormat = () => {
    return useQuery({
        queryKey: [TANSTACK_QUERY_KEYS.VARIANT.ALL],
        queryFn: () => formatService.getAllFormat(),
    });
};

export default useGetAllFormat;
