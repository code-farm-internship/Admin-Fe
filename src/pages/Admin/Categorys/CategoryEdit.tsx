import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Upload, Button, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../../../services/axiosInstance';
import { ICategory } from '../../../types/category';

const { Title } = Typography;

const CategoryEdit = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [category, setCategory] = useState<ICategory | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axiosInstance.get(`/categories/${id}`);
                const data: ICategory = res.data.data;
                setCategory(data);
                form.setFieldsValue({
                    name: data.name,
                    description: data.description || '',
                });
            } catch (error) {
                message.error('❌ Không thể tải danh mục');
            }
        };
        if (id) fetchCategory();
    }, [id, form]);

    const handleSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description || '');
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            setIsSubmitting(true);
            await axiosInstance.put(`/categories/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            message.success('✅ Cập nhật thành công');
            navigate('/dashboard/category');
        } catch (error: any) {
            message.error('❌ Lỗi: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!category) return <div>Đang tải...</div>;

    return (
        <div className='mx-auto max-w-2xl p-4'>
            <Title level={3}>Chỉnh sửa danh mục</Title>
            <Form form={form} layout='vertical' onFinish={handleSubmit}>
                <Form.Item
                    label='Tên danh mục'
                    name='name'
                    rules={[{ required: true, message: 'Tên danh mục là bắt buộc' }]}
                >
                    <Input placeholder='Nhập tên danh mục' />
                </Form.Item>

                <Form.Item label='Mô tả' name='description'>
                    <Input.TextArea rows={4} placeholder='Mô tả danh mục' />
                </Form.Item>

                <Form.Item label='Ảnh mới (tuỳ chọn)'>
                    <Upload
                        accept='image/*'
                        beforeUpload={(file) => {
                            setImageFile(file);
                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                    {!imageFile && category.image && (
                        <div className='mt-2'>
                            <img
                                src={category.image}
                                alt={category.name}
                                className='h-32 w-32 rounded border object-cover'
                            />
                        </div>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isSubmitting} disabled={isSubmitting}>
                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CategoryEdit;
