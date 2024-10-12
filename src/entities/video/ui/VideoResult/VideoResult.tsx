import cls from './VideoResult.module.scss';
import { useParams } from 'react-router-dom';
import { useLazyGetStatusQuery } from '@entities/video';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Стили для скелетонов

export const VideoResult = () => {
    const { id } = useParams<{ id: string }>(); // Получаем параметр id из URL
    const [trigger, { data }] = useLazyGetStatusQuery();
    useEffect(() => {
        if (id) {
            const interval = setInterval(() => {
                trigger({ id });
            }, 2000);
            if (data?.Video.state === 'SUCCESSFUL') {
                clearInterval(interval);
            }
        }
    }, [id, trigger]);

    return (
        <div className={cls.wrapper}>
            <div className={cls.status}>
                <p className={cls.text}>Статус видео: {data?.Video.state}</p>
            </div>
            {data?.Video.state === 'SUCCESSFUL' ? (
                <div className={cls.videoWrapper}>
                    <video
                        controls={true}
                        autoPlay={true}
                        className={cls.video}
                        src={`${import.meta.env.VITE_SERVER_URL}/minio/localbucket/output_video.mp4`}
                    />
                    <a href={`${import.meta.env.VITE_SERVER_URL}/minio/localbucket/output_video.mp4`}>
                        <button>Скачать</button>
                    </a>
                </div>
            ) : (
                <Skeleton className={cls.skeleton} />
            )}
        </div>
    );
};
