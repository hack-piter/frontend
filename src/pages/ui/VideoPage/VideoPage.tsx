import cls from './VideoPage.module.scss';
import { VideoResult } from '@entities/video';

export const VideoPage = () => {
    return (
        <div className={cls.wrapper}>
            <VideoResult />
        </div>
    );
};
