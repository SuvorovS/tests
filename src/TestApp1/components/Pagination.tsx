import React from "react";
import {Pagination as PaginationType} from "../server/server";
import {useHistory, useLocation} from "react-router-dom";
import { getValueFromUrlSearch, getSearchStringWithParams} from "../helpers/urlHelpers";
import { defaultLimit } from '../constants';
import '../../index.css';

export const Pagination = ({ pagination }: { pagination: PaginationType}) => {
    const { pathname, search } = useLocation();
    const { push } = useHistory();

    const { limit, page, totalItems} = pagination;
    const initialLimit = getValueFromUrlSearch(search,'limit') || String(defaultLimit)
    const [ limitValue, setLimitValue ] = React.useState(initialLimit);
    const totalPages = Math.ceil(totalItems / limit);

    const handlePageChange = (pageIndex: number) => {
        const newSearch = getSearchStringWithParams(search, {page: String(pageIndex) })
        push(`${pathname}?${newSearch}`)
    }

    const handlePrevPage = () => {
        if (page === 0) { return }
        const nextSearch = getSearchStringWithParams(search, { page: String(page - 1)})
        push(`${pathname}?${nextSearch}`);
    }
    const handleNextPage = () => {
        if (page === (totalPages - 1)) { return }
        const nextSearch = getSearchStringWithParams(search, { page: String(page + 1)})

        push(`${pathname}?${nextSearch}`);
    }

    const handleLimitChange = (limit: string) => {
        const newSearch = getSearchStringWithParams(search, {
            limit,
            filter: '',
            page: '0'
        });
        push(`${pathname}?${newSearch}`)
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <div>
                <button onClick={handlePrevPage}>prev</button>
                {
                    Array(totalPages)
                        .fill(null)
                        .map((el, index) => {
                                if (page === index) {
                                    return (
                                        <button
                                            key={`page-${index}`}
                                            className='isActive'
                                            onClick={() => handlePageChange(index)}
                                        >{index + 1}
                                        </button>
                                    );
                                }
                                return (
                                    <button
                                        key={`page-${index}`}
                                        onClick={() => handlePageChange(index)}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            }
                        )
                }
                <button onClick={handleNextPage}>next</button>
            </div>
            <div style={{ marginLeft: '15px'}}>
                <select onChange={(e) => {
                    setLimitValue(e.target.value);
                    handleLimitChange(e.target.value);
                }} value={limitValue}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>
        </div>
    );
}
