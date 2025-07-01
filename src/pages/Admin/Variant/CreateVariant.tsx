import { useToast } from '@/contexts/ToastProvider';
import useGetAllDiscount from '@/hooks/discount/queries/useGetAllDiscount';
import useGetAllFormat from '@/hooks/format/queries/useGetAllFormat';
import useCreateVariant from '@/hooks/variant/mutations/useCreateVariant';
import { IVariantForm, IVariantPayload } from '@/types/product';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormProps, UploadFile, UploadProps } from 'antd/lib';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VariationItem from './components/VariationItem';
import { PRIVATE_ROUTES } from '@/constants/routes';

const CreateVariant = () => {
    const { productId } = useParams();
    const [attributesFile, setAttributesFile] = useState<UploadFile[][]>([]);
    const toast = useToast();
    const [form] = useForm();
    const { data: formatRes } = useGetAllFormat();
    const { data: discountRes } = useGetAllDiscount({});
    const { mutate: createVariant, isPending } = useCreateVariant();
    const navigate = useNavigate();

    const handleChangeAttributeThumbnail = (index: number): UploadProps['onChange'] => {
        return ({ fileList: newFileList }) => {
            const newAttributesFile = [...attributesFile];
            newAttributesFile[index] = newFileList;
            setAttributesFile(newAttributesFile);
        };
    };
    const handleRemoveAttributeThumbnail = (index: number) => {
        const newAttributesFile = [...attributesFile];
        newAttributesFile.splice(index, 1);
        setAttributesFile(newAttributesFile);
    };

    const onFinish: FormProps<IVariantForm>['onFinish'] = (values) => {
        const formData = new FormData();
        const variants: IVariantPayload[] = [];
        const variantForm = values.variants;
        console.log(values);

        if (!productId) return;

        variantForm.map((variant) => {
            const extensionType = variant.image?.file.type.split('/').pop();
            const newVariant = {
                price: variant.price,
                stock: variant.stock,
                discountId: variant.discount,
                formatId: variant.format,
                imageRef: `${variant.image?.file.name}-${variant.image?.file.uid}.${extensionType}`,
            };
            variants.push(newVariant);
        });

        formData.append('variants', JSON.stringify(variants));
        formData.append('productId', productId);

        for (const item of variantForm) {
            if (item.image?.file) {
                const originalFile = item.image.file;
                const originalFileName = originalFile.name;
                const originalFileExtension = originalFileName.split('.').pop();
                const newFileName = `${item.image.file.name}-${item.image.file.uid}.${originalFileExtension}`;
                const renamedFile = new File([originalFile], newFileName, { type: originalFile.type });

                formData.append('variantImages', renamedFile);
            }
        }

        createVariant(formData, {
            onSuccess() {
                navigate(`/${PRIVATE_ROUTES.VARIANT.All}/${productId}`);
            },
        });
    };

    return (
        <div>
            <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                    navigate(`/${PRIVATE_ROUTES.VARIANT.All}/${productId}`);
                }}
                type='primary'
                size='middle'
            >
                Danh sách biển thể
            </Button>
            <Form layout='vertical' form={form} onFinish={onFinish}>
                <Form.List name='variants'>
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map(({ key, name, ...restField }, index) => {
                                return (
                                    <VariationItem
                                        key={key}
                                        format={formatRes?.data ?? []}
                                        discount={discountRes?.data ?? []}
                                        handleChangeThumbnail={handleChangeAttributeThumbnail}
                                        variantFile={attributesFile}
                                        handleRemoveThumbnail={handleRemoveAttributeThumbnail}
                                        index={index}
                                        fieldName={name}
                                        restField={restField}
                                        removeVariation={remove}
                                    />
                                );
                            })}
                            <Form.Item>
                                <Button
                                    type='dashed'
                                    htmlType='button'
                                    disabled={!productId}
                                    onClick={() => {
                                        if (fields.length >= 10) {
                                            toast('error', 'Bạn chỉ có thể thêm tối đa 10 biến thể !');
                                        } else {
                                            add();
                                        }
                                    }}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Thêm biến thể
                                </Button>
                            </Form.Item>
                            {errors && <Form.ErrorList errors={errors} className='text-red-600' />}
                        </>
                    )}
                </Form.List>
                <div className='flex justify-end'>
                    <Button type='primary' htmlType='submit' loading={isPending} disabled={isPending}>
                        Thêm biến thể vào sản phẩm
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateVariant;
