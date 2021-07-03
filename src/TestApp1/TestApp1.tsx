import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getData, ItemType, Pagination as PaginationType } from "./server/server";
import { getRequestParamsFromUrlSearchAsObj } from './helpers/urlHelpers';
import { Filter, Main, Pagination } from './components';
import { REQUEST_PARAMS } from './constants';


export const TestApp1 = () => {
    const { search } = useLocation();

    const [ content, setContent ] = useState<Array<ItemType>>([]);
    const [ pagination, setPagination ] = useState<PaginationType | null>(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        getData(getRequestParamsFromUrlSearchAsObj(search, REQUEST_PARAMS))
            .then(data => {
                setContent(data.content);
                setPagination(data.pagination);
                setLoading(false);
            })
    }, [search]);

    // console.log('render TestApp1', content);
    return (
        <div className="App">
            <div style={{background: "gray"}}>
                <Filter />
            </div>
            {
                loading ? <div>Loading...</div> : <Main items={content} />
            }

            { !loading && pagination && <Pagination pagination={pagination}/>}
        </div>
    );
}
