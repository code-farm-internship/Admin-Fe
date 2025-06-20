import {
    discountTypeItems,
    MAX_FIXED_DISCOUNT,
    MAX_PERCENT_DISCOUNT,
    MIN_FIXED_DISCOUNT,
    MIN_PERCENT_DISCOUNT,
} from '@/constants/discount';
import useCreateDiscount from '@/hooks/discount/mutations/useCreateDiscount';
import { DiscountType } from '@/types/discount';
import { disabledDate } from '@/utils/Date';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, FormProps, InputNumber, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

type DiscountTypeFormData = {
    discountType: DiscountType;
    discountValue: number;
    toTime: [Dayjs, Dayjs];
};

const { RangePicker } = DatePicker;

const CreateDiscount = () => {
    const [form] = Form.useForm<DiscountTypeFormData>();
    const { mutate: createDiscount, isPending } = useCreateDiscount();
    const [discountType, setDiscountType] = useState(DiscountType.PERCENT);

    const onFinish: FormProps<DiscountTypeFormData>['onFinish'] = (values) => {
        const startDate = values.toTime[0].toDate();
        const endDate = values.toTime[1].toDate();
        const payload = {
            discountType: values.discountType,
            discountValue: values.discountValue,
            startDate: startDate,
            endDate: endDate,
        };

        createDiscount(payload, {
            onSuccess() {
                form.resetFields();
            },
        });
    };

    return (
        <>
            <Form form={form} layout='vertical' className='p-6' onFinish={onFinish}>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
                    <div className='space-y-6 lg:col-span-8'>
                        <Form.Item<DiscountTypeFormData>
                            label={<span className='text-[15px] font-medium text-gray-800'>Loại giảm giá</span>}
                            name='discountType'
                            initialValue={DiscountType.PERCENT}
                        >
                            <Select
                                options={discountTypeItems}
                                onChange={(type) => {
                                    setDiscountType(type);
                                }}
                                placeholder='Chọn kiểu loại giảm giá'
                            ></Select>
                        </Form.Item>

                        <Form.Item<DiscountTypeFormData>
                            label={<span className='text-[15px] font-medium text-gray-800'>Giá trị giảm giá</span>}
                            name='discountValue'
                            rules={[
                                { required: true, message: 'Vui lòng nhập giá trị giảm giá' },
                                {
                                    validator: (_, discountValue) => {
                                        if (discountValue && discountType === DiscountType.PERCENT) {
                                            if (
                                                discountValue < MIN_PERCENT_DISCOUNT ||
                                                discountValue > MAX_PERCENT_DISCOUNT
                                            ) {
                                                return Promise.reject(
                                                    new Error(
                                                        'Giá trị giảm giá phần trăm phải lớn hớn 1 và nhỏ hơn hoặc bằng 100'
                                                    )
                                                );
                                            }
                                        } else {
                                            if (
                                                (discountValue && discountValue < MIN_FIXED_DISCOUNT) ||
                                                discountValue > MAX_FIXED_DISCOUNT
                                            ) {
                                                return Promise.reject(
                                                    new Error(
                                                        `Giá trị giảm giá cố định phải lớn hớn ${MIN_FIXED_DISCOUNT} và nhỏ hơn hoặc bằng ${MAX_FIXED_DISCOUNT}`
                                                    )
                                                );
                                            }
                                        }

                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            {discountType === DiscountType.PERCENT ? (
                                <InputNumber
                                    min={MIN_PERCENT_DISCOUNT}
                                    max={MAX_PERCENT_DISCOUNT}
                                    className='block w-full'
                                    placeholder='Nhập giá giảm'
                                />
                            ) : (
                                <InputNumber
                                    min={MIN_FIXED_DISCOUNT}
                                    max={MAX_FIXED_DISCOUNT}
                                    className='block w-full'
                                    placeholder='Nhập giá giảm'
                                />
                            )}
                        </Form.Item>

                        <Form.Item<DiscountTypeFormData>
                            label={<span className='text-[15px] font-medium text-gray-800'>Thời gian giảm giá</span>}
                            name='toTime'
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn khoảng thời gian',
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value || value.length !== 2) return Promise.resolve();

                                        const [start, end] = value;
                                        const now = dayjs();

                                        if (start.isBefore(now)) {
                                            return Promise.reject(new Error('Ngày bắt đầu phải từ hôm nay trở đi'));
                                        }

                                        if (!end.isAfter(start)) {
                                            return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu'));
                                        }

                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <RangePicker disabledDate={disabledDate} showNow showTime />
                        </Form.Item>
                    </div>
                    <div className='lg:col-span-4 lg:border-l lg:border-gray-100 lg:pl-6 lg:dark:border-gray-800'>
                        <div className='sticky top-6 space-y-6'>
                            <div className='rounded-lg border border-blue-100 bg-blue-50/50 p-4'>
                                <h4 className='mb-2 text-sm font-semibold text-blue-800'>Mẹo:</h4>
                                <p className='text-sm text-blue-700'>Lựa chọn loại giảm giá và giá giảm hợp lý.</p>
                            </div>
                            <Button
                                type='primary'
                                htmlType='submit'
                                disabled={isPending}
                                loading={isPending}
                                icon={<PlusSquareOutlined />}
                                size='large'
                                block
                                className='h-12 text-base font-medium shadow-md transition-all hover:shadow-lg'
                            >
                                Thêm giảm giá mới
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default CreateDiscount;
