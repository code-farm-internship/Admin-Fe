import { DiscountType, IDiscountResponse } from '@/types/discount';
import { IFormat } from '@/types/format';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Select, Upload, UploadFile, UploadProps } from 'antd';
import CustomItemRenderVariant from './CustomItemRenderVariant';
import UploadButtonVariant from './UploadButtonVariant';
import { memo } from 'react';
import { MAX_PRICE, MIN_PRICE } from '@/constants/discount';
import { formatCurrency } from '@/utils/formatCurrency';
import { selectSearch } from '@/utils/antd';
import dayjs from 'dayjs';

type IVariationsItem = {
    fieldName: number;
    format: IFormat[];
    discount: IDiscountResponse[];
    variantFile: UploadFile[][];
    index: number;
    restField: {
        fieldKey?: number;
    };
    id?: string;
    handleChangeThumbnail: (index: number) => UploadProps['onChange'];
    handleRemoveThumbnail: (index: number) => void;
    removeVariation: (name: number) => void;
};

const VariationItem = ({
    fieldName,
    format,
    discount,
    index,
    restField,
    variantFile,

    id,
    handleChangeThumbnail,
    handleRemoveThumbnail,
    removeVariation,
}: IVariationsItem) => {
    return (
        <div className='grid grid-cols-2 gap-3'>
            <Form.Item
                className='hidden w-full capitalize'
                {...restField}
                name={[fieldName, '_id']}
                dependencies={['_id']}
            >
                <InputNumber className='hidden' />
            </Form.Item>
            <Form.Item
                className='flex justify-center capitalize'
                {...restField}
                name={[fieldName, 'image']}
                dependencies={['image']}
            >
                <Upload
                    itemRender={CustomItemRenderVariant}
                    beforeUpload={() => false}
                    listType='picture'
                    fileList={variantFile[index]}
                    onChange={handleChangeThumbnail(index)}
                    maxCount={1}
                >
                    {variantFile[index]?.length >= 1 ? null : <UploadButtonVariant />}
                </Upload>
            </Form.Item>
            <Form.Item
                className='w-full capitalize'
                {...restField}
                name={[fieldName, 'format']}
                label='Định dạng'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn định dạng!',
                    },
                ]}
            >
                <Select
                    placeholder='Chọn định dạng!'
                    options={format.map((item) => ({ label: item.name, value: item._id }))}
                ></Select>
            </Form.Item>
            <Form.Item
                className='w-full capitalize'
                {...restField}
                name={[fieldName, 'price']}
                label='Giá'
                rules={[{ required: true, message: 'Hãy nhập giá!' }]}
            >
                <InputNumber min={MIN_PRICE} max={MAX_PRICE} placeholder='Nhập giá sản phẩm...' className='w-full' />
            </Form.Item>
            <Form.Item className='w-full capitalize' {...restField} name={[fieldName, 'discount']} label='Giảm giá'>
                <Select
                    placeholder='Chọn giảm giá!'
                    showSearch
                    filterOption={(input, option) => selectSearch(option, input)}
                    allowClear
                    options={discount.map((value) => {
                        return {
                            label: (
                                <div>
                                    <div className='flex gap-1'>
                                        <span className='capitalize'>{value.discountType}</span>
                                        <span>-</span>
                                        <span>
                                            {value.discountType === DiscountType.PERCENT
                                                ? `${value.discountValue}%`
                                                : formatCurrency(value.discountValue)}
                                        </span>
                                        <span>{dayjs(value.startDate).format('DD-MM')}</span>
                                        <span>đến</span>
                                        <span>{dayjs(value.endDate).format('DD-MM-YYYY')}</span>
                                    </div>
                                </div>
                            ),
                            searchLabel: `${value.discountType}-${value.discountValue}`,
                            value: value._id,
                        };
                    })}
                ></Select>
            </Form.Item>
            <Form.Item
                className='w-full capitalize'
                {...restField}
                name={[fieldName, 'stock']}
                label='Kho hàng'
                rules={[{ required: true, message: 'Hãy nhập số lượng!' }]}
            >
                <InputNumber min={1} placeholder='Nhập số lượng sản phẩm...' className='w-full' />
            </Form.Item>
            <div className='flex items-center'>
                {!id && (
                    <MinusCircleOutlined
                        onClick={() => {
                            handleRemoveThumbnail(index);
                            removeVariation(fieldName);
                        }}
                        className='text-xl'
                    />
                )}
            </div>
        </div>
    );
};

export default memo(VariationItem);
