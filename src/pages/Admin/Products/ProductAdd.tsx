import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ICategory } from '../../../types/category';
import { IVendor } from '../../../types/vendor';
import { createProduct } from '../../../services/product.service';
import { getAllCategories } from '../../../services/category.service';
import { getAllVendors } from '../../../services/vendor.service';

import type { RcFile } from 'antd/es/upload';

const ProductAdd = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [vendors, setVendors] = useState<IVendor[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [libraryFiles, setLibraryFiles] = useState<File[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesData, vendorsData] = await Promise.all([getAllCategories(), getAllVendors()]);
                setCategories(categoriesData);
                setVendors(vendorsData);
            } catch (error) {
                console.error('Error fetching data:', error);
                message.error('Failed to load form data');
            }
        };
        fetchData();
    }, []);

    const beforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
        }
        return isImage && isLt2M;
    };

    const onFinish = async (values: any) => {
        if (!thumbnailFile) {
            message.error('Please upload a thumbnail image');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description || '');
            formData.append('author', values.author);
            formData.append('categoryId', values.categoryId);
            formData.append('vendorId', values.vendorId);
            formData.append('thumbnail', thumbnailFile);
            formData.append('priceRange[min]', values.priceMin);
            formData.append('priceRange[max]', values.priceMax);

            if (libraryFiles.length > 0) {
                libraryFiles.forEach((file) => {
                    formData.append('library', file);
                });
            }

            await createProduct(formData);
            message.success('Product added successfully');
            navigate('/admin/products');
        } catch (error: any) {
            message.error(error.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <h2 className='mb-4 text-2xl font-semibold'>Add New Product</h2>
            <Form form={form} layout='vertical' onFinish={onFinish} className='max-w-2xl'>
                <Form.Item
                    name='name'
                    label='Product Name'
                    rules={[
                        { required: true, message: 'Please input product name!' },
                        { min: 15, message: 'Product name must be at least 15 characters' },
                        { max: 100, message: 'Product name must be less than 100 characters' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='description'
                    label='Description'
                    rules={[{ max: 1000, message: 'Description must be less than 1000 characters' }]}
                >
                    <Input.TextArea rows={4} />
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
                    name='author'
                    label='Author'
                    rules={[{ required: true, message: 'Please input author name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name='categoryId'
                    label='Category'
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select>
                        {categories.map((category) => (
                            <Select.Option key={category._id} value={category._id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name='vendorId'
                    label='Vendor'
                    rules={[{ required: true, message: 'Please select a vendor!' }]}
                >
                    <Select>
                        {vendors.map((vendor) => (
                            <Select.Option key={vendor._id} value={vendor._id}>
                                {vendor.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Thumbnail'
                    required
                    rules={[{ required: true, message: 'Please upload a thumbnail image!' }]}
                >
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
                            Add Product
                        </Button>
                        <Button onClick={() => navigate('/dashboard/products')}>Cancel</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductAdd;
