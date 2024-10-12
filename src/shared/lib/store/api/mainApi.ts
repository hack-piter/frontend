import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { RefreshResponse } from '@shared/lib';

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        const refreshResult = await baseQuery('/auth/refresh-tokens', api, extraOptions);
        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as RefreshResponse;
            const token = accessToken.split(' ')[1];
            localStorage.setItem('accessToken', token);
            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem('accessToken');
        }
    }
    return result;
};

export const mainApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (_builder) => ({}),
    tagTypes: ['User'],
});

