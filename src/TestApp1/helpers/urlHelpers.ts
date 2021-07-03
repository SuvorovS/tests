import { RequestParams } from '../constants';

export const getRequestParamsFromUrlSearchAsObj = (urlSearch: string, requestParams: RequestParams) => {
    const urlSearchParams = new URLSearchParams(urlSearch);
    return requestParams.reduce((acc, el, index) => {
        const searchedParam = urlSearchParams.get(el.param);
        if (searchedParam) {
            return { ...acc, [el.param]: searchedParam };
        }

        return { ...acc, [el.param]: el.defaultValue };
    }, {})
};

export const getSearchStringWithParams = (urlSearch: string, params: { [key: string]: string}) => {
    const newParams = new URLSearchParams(urlSearch);
    for (let param in params) {
        const paramValue = params[param];
        if (!paramValue) {
            newParams.delete(param)
        } else {
            newParams.set(param, encodeURI(params[param]))
        }
    }

    return newParams.toString();
}

export const getValueFromUrlSearch = (urlSearch: string, param: string) => {
    const url = new URLSearchParams(urlSearch);
    return url.get(param);
}
