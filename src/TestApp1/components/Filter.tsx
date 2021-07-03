import {useHistory, useLocation} from "react-router-dom";
import React from "react";
import {getSearchStringWithParams, getValueFromUrlSearch} from "../helpers/urlHelpers";

export const Filter = React.memo(() => {
    const { pathname, search } = useLocation();
    const { push } = useHistory();

    const [ filterValue, setFilterValue] = React.useState('');

    React.useEffect(() => {
        const filter = getValueFromUrlSearch(search, 'filter');
        const initialFilter = filter ? decodeURIComponent(filter as string) : '';
        setFilterValue(initialFilter);
    }, [search])

    const handleFilterValueChange = (event: React.FormEvent<HTMLInputElement>) => {
        const filter = event.currentTarget.value
        setFilterValue(filter);
    }

    const handleFilter = () => {
        const newSearch = getSearchStringWithParams(search, { filter: filterValue, page: '0' });
        push(`${pathname}?${newSearch}`)
    }

    return (
        <>
            <input onChange={handleFilterValueChange} type="text" value={filterValue}/>
            <button onClick={handleFilter}>Filter</button>
        </>
    );
});
