import { Spin } from 'antd';

const Loader = () => {
    return (
        // <div className='z-20 flex min-h-screen w-screen items-center justify-center bg-white/70 backdrop-blur-md'>
        //     <Spin size='large' className='relative z-30'></Spin>
        // </div>
        <div className='z-20 flex min-h-screen w-screen items-center justify-center bg-white/40 backdrop-blur-md'>
            <Spin size='large' className='relative z-30'></Spin>
        </div>
    );
};

export default Loader;
