const AdminHeader = () => {
    return (
        <header className='fixed left-64 top-0 z-50 flex h-16 w-[calc(100%-256px)] items-center justify-between border-b bg-white px-8 shadow-sm'>
            <h1 className='text-xl font-bold uppercase tracking-wide text-gray-800'>Trang quản trị website</h1>

            <div className='flex items-center gap-6'>
                <div className='relative'>
                    <input
                        type='text'
                        placeholder='Tìm kiếm...'
                        className='w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <svg
                        className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        viewBox='0 0 24 24'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z'
                        />
                    </svg>
                </div>

                <div className='flex items-center gap-2'>
                    <i className='fa-solid fa-user text-lg text-gray-500' />
                    <span className='text-sm text-gray-700'>
                        Xin chào, <span className='font-semibold text-black'>Admin</span>!
                    </span>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
