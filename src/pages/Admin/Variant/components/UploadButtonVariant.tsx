import { FileImageOutlined } from '@ant-design/icons';

const UploadButtonVariant = () => {
    return (
        <div className='ant-upload-list-item ant-upload-list-item-undefined'>
            <FileImageOutlined className='h-full w-full cursor-pointer text-[3.4rem] opacity-15' />
        </div>
    );
};

export default UploadButtonVariant;
