import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Upload, Button, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../../../services/axiosInstance';

const { Title } = Typography;

const CategoryAdd = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        if (!values.name) {
            message.warning('Tên danh mục là bắt buộc');
            return;
        }

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description || '');
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            setIsSubmitting(true);
            await axiosInstance.post('/categories/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            message.success('✅ Thêm danh mục thành công');
            form.resetFields();
            setImageFile(null);
            navigate('/dashboard/category');
        } catch (error: any) {
            message.error('❌ Lỗi: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mx-auto max-w-2xl p-4'>
            <Title level={3}>Thêm danh mục</Title>
            <Form form={form} layout='vertical' onFinish={handleSubmit}>
                <Form.Item
                    label='Tên danh mục'
                    name='name'
                    rules={[{ required: true, message: 'Tên danh mục là bắt buộc' }]}
                >
                    <Input placeholder='Nhập tên danh mục' />
                </Form.Item>

                <Form.Item label='Mô tả' name='description'>
                    <Input.TextArea placeholder='Mô tả (không bắt buộc)' rows={4} />
                </Form.Item>

                <Form.Item label='Ảnh'>
                    <Upload
                        accept='image/*'
                        beforeUpload={(file) => {
                            setImageFile(file);
                            return false;
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                    {imageFile && (
                        <div className='mt-2'>
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt='Preview'
                                className='h-32 w-32 rounded border object-cover'
                            />
                        </div>
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isSubmitting} disabled={isSubmitting}>
                        {isSubmitting ? 'Đang thêm...' : 'Thêm danh mục'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CategoryAdd;
