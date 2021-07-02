import React, { useEffect, useState } from 'react';
import './App.css';
import { getData, ItemType, Pagination as PaginationType } from "./server/server";

const defaultLimit = 2;
const ItemCard = ({ item }: { item: ItemType }) => {
  return (
      <div style={{
        padding: '10px',
        border: '1px solid',
        margin: '10px',
      }}>
        <div>name: {item.name}</div>
        <div>artnumber: {item.artnumber}</div>
        <div>brand: {item.brand}</div>
        <div>weight: {item.weight}</div>
        <div>quantity: {item.quantity}</div>
        <div>price: {item.price}</div>
        <div>stock: {item.stock}</div>
      </div>
  )
}
const getValueFromUrl = (param: string) => {
    const url = new URL(window.location.href);
    return url.searchParams.get(param);
}

const addParamsToUrl = (params: { [key: string]: string}) => {
    const newParams = new URLSearchParams(window.location.search);
    for (let param in params) {
        const paramValue = params[param];
        if (!paramValue) {
            newParams.delete(param)
        } else {
            newParams.set(param, encodeURI(params[param]))
        }
    }

    window.history.pushState({},'', `?${newParams.toString()}`);
    window.dispatchEvent(new CustomEvent(
        'urlSearchChange',
        { detail: newParams}
    ));
}

const Filter = () => {
    const filter = getValueFromUrl('filter');
    const urlFilter = filter ? decodeURIComponent(getValueFromUrl('filter') as string) : '';
    const [ filterValue, setFilterValue] = React.useState(urlFilter);

    useEffect(() => {
        setFilterValue(urlFilter);
    }, [urlFilter])
    const handleFilter = () => {
        addParamsToUrl({ filter: filterValue, page: '0' });
    }
    const handleFilterValueChange = (event: React.FormEvent<HTMLInputElement>) => {
        const filter = event.currentTarget.value
        setFilterValue(filter);
    }

    return (
        <>
            <input onChange={handleFilterValueChange} type="text" value={filterValue}/>
            <button onClick={handleFilter}>Filter</button>
        </>
    );
}

const Main = ({items}: { items: Array<ItemType>}) => {
    return (
        <div style={{ display: "flex", flexDirection: "row"}}>
            {items.map(item => <ItemCard key={item.artnumber} item={item} />)}
        </div>
    );
}

const Pagination = ({ pagination }: { pagination: PaginationType}) => {
    const { limit, page, totalItems} = pagination;
    const initialLimit = getValueFromUrl('limit') || String(defaultLimit)
    const [ limitValue, setLimitValue ] = React.useState(initialLimit);
    const pageAmount = Math.ceil(totalItems / limit);

    const handlePageChange = (pageIndex: number) => {
        addParamsToUrl({filter: '', page: String(pageIndex) })
    }
    const handleLimitChange = (limit: string) => {
        addParamsToUrl({
            limit,
            filter: '',
            page: '0'
        })
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <div>
                {
                    Array(pageAmount)
                        .fill(null)
                        .map((el, index) => {
                            if (page === index) {
                                return (
                                    <button
                                        key={`page-${index}`}
                                        className='isActive'
                                        onClick={() => handlePageChange(index)}
                                    >{index}
                                    </button>
                                );
                            }
                            return (
                                <button
                                    key={`page-${index}`}
                                    onClick={() => handlePageChange(index)}
                                >
                                    {index}
                                </button>
                            )
                        }
                    )
                }
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

const App = () => {
    const initialReauestParams = {
        filter: getValueFromUrl('filter') || '',
        page: Number(getValueFromUrl('page')) || 0,
        limit: Number(getValueFromUrl('limit')) || defaultLimit,
    }
    const [ requestParams, setRequestParams ] = useState(initialReauestParams);

    useEffect(() => {
        window.addEventListener('urlSearchChange', ({detail}: any) => {
            const newRequestParams = {
                filter: detail.get('filter') || '',
                page: Number(detail.get('page')) || 0,
                limit: Number(detail.get('limit')) || defaultLimit, // TS не видит разници между строкой и числом, привожу руками к числу
            }
            setRequestParams(newRequestParams)
        });
    }, [requestParams]);

    const { pagination, content} = getData(requestParams);


    return (
        <div className="App">
            <div style={{background: "gray"}}>
                <Filter />
            </div>
            <Main items={content} />
            <Pagination pagination={pagination} />
        </div>
    );
}

export default App;
