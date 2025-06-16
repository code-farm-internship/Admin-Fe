import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import axiosInstance from '../../../services/axiosInstance';

const { Title } = Typography;

const VendorAdd = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values: { name: string; description?: string }) => {
        try {
            setIsSubmitting(true);
            await axiosInstance.post('/vendors/create', values);
            message.success('✅ Thêm nhà cung cấp thành công');
            form.resetFields();
            navigate('/dashboard/vendor');
        } catch (error: any) {
            message.error('❌ Lỗi: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mx-auto max-w-2xl p-4'>
            <Title level={3}>Thêm nhà cung cấp</Title>
            <Form form={form} layout='vertical' onFinish={handleSubmit}>
                <Form.Item
                    label='Tên nhà cung cấp'
                    name='name'
                    rules={[{ required: true, message: 'Tên nhà cung cấp là bắt buộc' }]}
                >
                    <Input placeholder='Nhập tên nhà cung cấp' />
                </Form.Item>

                <Form.Item label='Mô tả' name='description'>
                    <Input.TextArea rows={4} placeholder='Mô tả (không bắt buộc)' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={isSubmitting} disabled={isSubmitting}>
                        {isSubmitting ? 'Đang thêm...' : 'Thêm'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default VendorAdd;
