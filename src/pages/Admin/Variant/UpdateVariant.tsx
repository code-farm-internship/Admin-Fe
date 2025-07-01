import { PRIVATE_ROUTES } from '@/constants/routes';
import { useToast } from '@/contexts/ToastProvider';
import useGetAllDiscount from '@/hooks/discount/queries/useGetAllDiscount';
import useGetAllFormat from '@/hooks/format/queries/useGetAllFormat';
import useUpdateVariant from '@/hooks/variant/mutations/useUpdateVariant';
import { IVariantForm, IVariantPayload } from '@/types/product';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormProps, UploadFile, UploadProps } from 'antd/lib';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VariationItem from './components/VariationItem';
import useGetAllVariant from '@/hooks/variant/useGetAllVariant';
import convertApiResponseToFileList from '@/utils/convertImageUrlToFileList';

const UpdateVariant = () => {
    const { productId } = useParams();
    const [variantFile, setAttributesFile] = useState<UploadFile[][]>([]);
    const [oldVariantFile, setOldVariantFile] = useState<UploadFile[][]>([]);
    const toast = useToast();
    const [form] = useForm<IVariantForm>();
    const { data: formatRes } = useGetAllFormat();
    const { data: discountRes } = useGetAllDiscount({});
    const { mutate: updateVariant, isPending } = useUpdateVariant();
    const { data, isLoading } = useGetAllVariant(productId as string);
    const navigate = useNavigate();

    const handleChangeAttributeThumbnail = (index: number): UploadProps['onChange'] => {
        return ({ fileList: newFileList }) => {
            const newAttributesFile = [...variantFile];
            newAttributesFile[index] = newFileList;
            setAttributesFile(newAttributesFile);
        };
    };
    const handleRemoveAttributeThumbnail = (index: number) => {
        const newAttributesFile = [...variantFile];
        newAttributesFile.splice(index, 1);
        setAttributesFile(newAttributesFile);
    };

    const initialVariant = useMemo(
        () =>
            data?.variants.map((v) => ({
                ...v,
                format: v.formatId._id,
                discount: v.discountId?._id,
            })),
        [data?.variants]
    );

    const imagesConvert = useMemo(
        () =>
            data?.variants.map((item) =>
                convertApiResponseToFileList({ url: item.image, urlRef: item.imageUrlRef, isArr: true })
            ) as UploadFile[][],
        [data?.variants]
    );

    const onFinish: FormProps<IVariantForm>['onFinish'] = (values) => {
        const formData = new FormData();
        const variants: IVariantPayload[] = [];
        const variantForm = values.variants;

        if (!productId) return;

        variantForm.map((variant) => {
            let extensionType = '';

            const newVariant = {
                _id: variant._id,
                price: variant.price,
                stock: variant.stock,
                discountId: variant.discount,
                formatId: variant.format,
            };

            if (variant.image?.file) {
                extensionType = variant.image?.file.type.split('/').pop() || '';
                Object.assign(newVariant, {
                    imageRef: `${variant.image?.file.name}-${variant.image?.file.uid}.${extensionType}`,
                });
            }

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

        updateVariant(formData, {
            onSuccess() {
                navigate(`/${PRIVATE_ROUTES.VARIANT.All}/${productId}`);
            },
        });
    };

    useEffect(() => {
        if (data?.variants) {
            setAttributesFile(imagesConvert);
            setOldVariantFile(imagesConvert);

            form.setFieldValue('variants', initialVariant);
        }
    }, [productId, initialVariant]);

    return (
        <div>
            {' '}
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
                                const productVariantId = form.getFieldValue(['variants', name, '_id']);
                                return (
                                    <VariationItem
                                        key={key}
                                        format={formatRes?.data ?? []}
                                        discount={discountRes?.data ?? []}
                                        handleChangeThumbnail={handleChangeAttributeThumbnail}
                                        variantFile={variantFile}
                                        handleRemoveThumbnail={handleRemoveAttributeThumbnail}
                                        index={index}
                                        fieldName={name}
                                        restField={restField}
                                        removeVariation={remove}
                                        id={productVariantId}
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
                    <Button type='primary' htmlType='submit' loading={isPending} disabled={isPending || isLoading}>
                        Thêm biến thể vào sản phẩm
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default UpdateVariant;
