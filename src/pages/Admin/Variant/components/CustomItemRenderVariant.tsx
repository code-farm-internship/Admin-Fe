import { DeleteOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';

const CustomItemRenderVariant: UploadProps['itemRender'] = (originNode, file, fileList, actions) => {
    return (
        <div className='ant-upload-list-item ant-upload-list-item-undefined h-40! w-40! relative'>
            <img className='h-full w-full object-cover' src={file.thumbUrl || file.url} alt={file.name} />
            <span className='ant-upload-list-item-actions absolute -right-5 top-0'>
                <span
                    onClick={actions.remove}
                    className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action cursor-pointer select-none rounded-full bg-red-500 p-1 text-white'
                >
                    <DeleteOutlined style={{ fontSize: 18, color: '#fff' }} />
                </span>
            </span>
        </div>
    );
};

export default CustomItemRenderVariant;
