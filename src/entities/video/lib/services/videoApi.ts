import { mainApi } from '@shared/lib/store/api/mainApi.ts';
import { IVideo, UploadVideoRequest, VideoResponse } from '@entities/video';

export const videoApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
        postVideo: builder.mutation<VideoResponse, UploadVideoRequest>({
            query: ({ video }) => {
                const formData = new FormData();
                formData.append('video_file', video); // Append the file with the key 'video'

                return {
                    method: 'POST',
                    url: `/api/v2/video`,
                    body: formData,
                };
            },
        }),
        getStatus: builder.query<{ Video: IVideo }, { id: string }>({
            query: ({ id }) => ({
                method: 'GET',
                url: `/api/v2/video/${id}`,
            }),
        }),
    }),
});

export const { usePostVideoMutation, useLazyGetStatusQuery } = videoApi;
