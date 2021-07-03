export type RequestParams = Array<{ param: string, defaultValue: string }>;

export const defaultLimit = '2';

export const REQUEST_PARAMS: RequestParams = [
    {param: 'filter', defaultValue: ''},
    {param: 'page', defaultValue: '0'},
    {param: 'limit', defaultValue: defaultLimit},
];
