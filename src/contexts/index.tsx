import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './QueryProvider';
import { ToastProvider } from './ToastProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <ToastProvider>
                <QueryProvider>{children}</QueryProvider>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default Providers;
