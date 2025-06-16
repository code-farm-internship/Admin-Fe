import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
import axiosInstance from '../../../services/axiosInstance';
import { IVendor } from '../../../types/vendor';

const { Title } = Typography;

const VendorEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const res = await axiosInstance.get(`/vendors/${id}`);
                const data: IVendor = res.data.data;
                form.setFieldsValue({
                    name: data.name,
                    description: data.description || '',
                });
            } catch (err) {
                message.error('Không tìm thấy nhà cung cấp');
                navigate('/dashboard/vendor');
            }
        };

        if (id) fetchVendor();
    }, [id, form, navigate]);

    const handleSubmit = async (values: any) => {
        try {
            setIsSubmitting(true);
            await axiosInstance.put(`/vendors/update/${id}`, values);
            message.success('✅ Cập nhật thành công');
            navigate('/dashboard/vendor');
        } catch (error: any) {
            message.error('❌ Lỗi: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mx-auto max-w-2xl p-4'>
            <Title level={3}>Chỉnh sửa nhà cung cấp</Title>
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
                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default VendorEdit;
