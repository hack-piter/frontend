import cls from './MainPage.module.scss';
import { VideoForm } from '@entities/video';

export const MainPage = () => {
    return (
        <div className={cls.wrapper}>
            <p className={cls.text}>Загрузка видео</p>
            <VideoForm />
        </div>
    );
};
