import { get } from '@/lib/api';
import { IPaginateResponse } from '@/types/api';
import { IFormat } from '@/types/format';

export const formatService = {
    async getAllFormat() {
        return await get<IPaginateResponse<IFormat[]>>('/formats/all');
    },
};
