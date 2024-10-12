import cls from './Wrapper.module.scss';
import { Outlet } from 'react-router-dom';

export const Wrapper = () => {
    return (
        <div className={cls.wrapper}>
            <Outlet />
        </div>
    );
};
