import { Outlet } from 'react-router-dom';
import { Toast } from '../Common/toast';

interface AppLayout { }

export const AppLayout: React.FC<AppLayout> = ({ }) => {
    return (
        <div className="">
            <Toast />
            <Outlet />
        </div>
    );
};
