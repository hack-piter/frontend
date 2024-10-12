import cls from './VideoForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { usePostVideoMutation } from '@entities/video';
import { useNavigate } from 'react-router-dom';

export const VideoForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const [postVideo, { data: videoData }] = usePostVideoMutation();

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        if (videoData) {
            navigate(videoData.id);
        }
    }, [videoData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add(cls.dragOver);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(cls.dragOver);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(cls.dragOver);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async () => {
        try {
            if (file) {
                await postVideo({ video: file }).unwrap();
            } else {
                alert('Выберите способ доставки');
            }
        } catch (error) {
            console.error('Error submitting:', error);
        }
    };

    return (
        <div className={cls.wrapper}>
            {file ? (
                <div className={cls.video}>
                    <video src={URL.createObjectURL(file)} controls></video>
                    <p className={cls.text}>{file.name}</p>
                    <button className={cls.submitButton} type="button" onClick={handleSubmit}>
                        Отправить
                    </button>
                </div>
            ) : (
                <form className={cls.form}>
                    <div className={cls.fileWrapper}>
                        <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} />
                        <div
                            className={cls.info}
                            onClick={handleClick}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <button className={cls.btn} type="button">
                                Выбрать видео
                            </button>
                            <p className={cls.text}>Выберите файлы или перетащите их сюда</p>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};
