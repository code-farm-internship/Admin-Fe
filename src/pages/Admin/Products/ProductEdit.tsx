import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getProductById, updateProduct } from '../../../services/product.service';
import { getAllCategories } from '../../../services/category.service';
import { getAllVendors } from '../../../services/vendor.service';
import { ICategory } from '../../../types/category';
import { IVendor } from '../../../types/vendor';

const ProductEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [vendors, setVendors] = useState<IVendor[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [product, categoriesData, vendorsData] = await Promise.all([
                    getProductById(id!),
                    getAllCategories(),
                    getAllVendors(),
                ]);

                setCategories(categoriesData);
                setVendors(vendorsData);

                setTimeout(() => {
                    form.setFieldsValue({
                        name: product.name,
                        description: product.description,
                        author: product.author,
                        categoryId: (product.categoryId as any)?._id,
                        vendorId: (product.vendorId as any)?._id,
                        priceMin: product.priceRange?.min,
                        priceMax: product.priceRange?.max,
                    });
                }, 0);
            } catch (error) {
                message.error('❌ Lỗi khi tải dữ liệu sản phẩm');
            } finally {
                setInitialLoading(false);
            }
        };
        fetchData();
    }, [id, form]);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            if (thumbnailFile) {
                const formData = new FormData();
                formData.append('productId', id!);
                formData.append('name', values.name);
                formData.append('description', values.description || '');
                formData.append('author', values.author);
                formData.append('categoryId', values.categoryId);
                formData.append('vendorId', values.vendorId);
                formData.append('priceRange[min]', values.priceMin);
                formData.append('priceRange[max]', values.priceMax);
                formData.append('thumbnail', thumbnailFile);
                await updateProduct(id!, formData);
            } else {
                const payload = {
                    ...values,
                    productId: id!,
                    priceRange: {
                        min: values.priceMin,
                        max: values.priceMax,
                    },
                };
                await updateProduct(id!, payload);
            }

            message.success('✅ Cập nhật sản phẩm thành công');
            navigate('/dashboard/products');
        } catch (error: any) {
            message.error(error.message || '❌ Cập nhật thất bại');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return <div>⏳ Đang tải dữ liệu...</div>;

    return (
        <div className='p-4'>
            <h2 className='mb-4 text-2xl font-semibold'>Chỉnh sửa sản phẩm</h2>
            <Form form={form} layout='vertical' onFinish={onFinish} className='max-w-2xl'>
                <Form.Item
                    name='name'
                    label='Tên sản phẩm'
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên sản phẩm' },
                        { min: 15, message: 'Tên sản phẩm phải ít nhất 15 ký tự' },
                        { max: 100, message: 'Tên sản phẩm không quá 100 ký tự' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='description'
                    label='Mô tả'
                    rules={[{ max: 1000, message: 'Mô tả không quá 1000 ký tự' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name='author'
                    label='Tác giả'
                    rules={[{ required: true, message: 'Vui lòng nhập tên tác giả' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='priceMin'
                    label='Giá thấp nhất'
                    rules={[{ required: true, message: 'Vui lòng nhập giá thấp nhất!' }]}
                >
                    <Input type='number' addonAfter='₫' />
                </Form.Item>

                <Form.Item
                    name='priceMax'
                    label='Giá cao nhất'
                    rules={[{ required: true, message: 'Vui lòng nhập giá cao nhất!' }]}
                >
                    <Input type='number' addonAfter='₫' />
                </Form.Item>

                <Form.Item
                    name='categoryId'
                    label='Danh mục'
                    rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                >
                    <Select>
                        {categories.map((cat) => (
                            <Select.Option key={cat._id} value={cat._id}>
                                {cat.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name='vendorId'
                    label='Nhà cung cấp'
                    rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
                >
                    <Select>
                        {vendors.map((vendor) => (
                            <Select.Option key={vendor._id} value={vendor._id}>
                                {vendor.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label='Thay ảnh thumbnail'>
                    <Upload
                        beforeUpload={(file) => {
                            setThumbnailFile(file);
                            return false;
                        }}
                        maxCount={1}
                        listType='picture'
                    >
                        <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <div className='flex gap-4'>
                        <Button type='primary' htmlType='submit' loading={loading}>
                            Cập nhật
                        </Button>
                        <Button onClick={() => navigate('/dashboard/products')}>Huỷ</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductEdit;
