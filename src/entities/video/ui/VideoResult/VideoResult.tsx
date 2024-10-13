import cls from './VideoResult.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Стили для скелетонов

export const VideoResult = () => {
    const { id } = useParams<{ id: string }>(); // Получаем параметр id из URL
    const [videoState, setVideoState] = useState<string | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        if (id) {
            const ws = new WebSocket(`${import.meta.env.VITE_WS_SERVER_URL}/img`);
            setSocket(ws);

            ws.onmessage = (event) => {
                console.log(event);
            };

            // Очистка WebSocket при размонтировании компонента
            return () => {
                ws.close();
            };
        }
    }, [id]);

    return (
        <div className={cls.wrapper}>
            <div className={cls.status}>
                <p className={cls.text}>Статус видео: {videoState}</p>
            </div>

            {imageSrc ? (
                <div className={cls.imageWrapper}>
                    <img src={imageSrc} alt="Превью видео" className={cls.image} />
                </div>
            ) : (
                <Skeleton className={cls.skeleton} />
            )}
        </div>
    );
};
