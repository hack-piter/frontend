export interface VideoResponse {
    id: string;
}

export interface UploadVideoRequest {
    video: File;
}

export interface IVideo {
    state: string;
    content_length: number;
    updated_at: string;
    path: string;
    id: string;
    content_type: string;
    created_at: string;
}
