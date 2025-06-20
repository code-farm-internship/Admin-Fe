import dayjs, { Dayjs } from 'dayjs';

export const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day');
};
