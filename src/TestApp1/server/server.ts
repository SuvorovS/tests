export type ItemType = {
    artnumber: number,
    name: string,
    brand: string,
    weight: number,
    quantity: number,
    price: number,
    stock: number
};

const data: Array<ItemType> = [
    {
        artnumber: 123456,
        name: "Корм 1",
        brand: "Felix",
        weight: 1500,
        quantity: 20,
        price: 1500,
        stock: 1
    },
    {
        artnumber: 123457,
        name: "Корм 2",
        brand: "Felix",
        weight: 1100,
        quantity: 10,
        price: 1400,
        stock: 0
    },
    {
        artnumber: 123458,
        name: "Корм 3",
        brand: "Felix",
        weight: 1500,
        quantity: 20,
        price: 3500,
        stock: 1
    },
    {
        artnumber: 123459,
        name: "Корм 4",
        brand: "Felix",
        weight: 1500,
        quantity: 30,
        price: 3450,
        stock: 0
    },
    {
        artnumber: 1234510,
        name: "Корм 5",
        brand: "Sheba",
        weight: 1500,
        quantity: 20,
        price: 20,
        stock: 0
    },
    {
        artnumber: 1234511,
        name: "Корм 6",
        brand: "Sheba",
        weight: 1500,
        quantity: 60,
        price: 50,
        stock: 1
    },
    {
        artnumber: 1234512,
        name: "Корм 7",
        brand: "Royal Canin",
        weight: 150,
        quantity: 10,
        price: 150,
        stock: 1
    },
    {
        artnumber: 123451212,
        name: "Корм 8",
        brand: "Royal Canin",
        weight: 9000,
        quantity: 1,
        price: 6000,
        stock: 0
    },
    {
        artnumber: 1234513,
        name: "Корм 9",
        brand: "Whiskas",
        weight: 800,
        quantity: 1,
        price: 10,
        stock: 1
    },
    {
        artnumber: 1234515,
        name: "Корм 10",
        brand: "Whiskas",
        weight: 1500,
        quantity: 1,
        price: 860,
        stock: 0
    },
    {
        artnumber: 1234514,
        name: "Корм 11",
        brand: "Petcurean",
        weight: 800,
        quantity: 20,
        price: 1150,
        stock: 1
    },
    {
        artnumber: 123456654,
        name: "Корм 12",
        brand: "AlmoNature",
        weight: 500,
        quantity: 10,
        price: 1800,
        stock: 1
    }
]
export type Pagination = {
    totalItems: number,
    limit: number,
    page: number,
}

type PaginationType = {
    content: Array<ItemType>,
    pagination: Pagination,
}

type SortingParam = {
    sortKey: 'artnumber' | 'name' | 'brand' | 'weight' | 'quantity' | 'price' ,
    sortValue: 'asc' | 'desc',
};

type GetDataParams = {
    page?: number,
    limit?: number,
    sort?: SortingParam,
    filter?: string,
}

const defaultSorting: SortingParam = {
    sortKey: 'artnumber',
    sortValue: 'asc',
}

export const getData = (
    {
        page = 0,
        limit = 10,
        sort = defaultSorting,
        filter
}: GetDataParams): Promise<PaginationType> => {
    const decodedFilter = filter ? decodeURIComponent(filter) : null;
    const searchedData = decodedFilter ? data.filter(item => item.name.includes(decodedFilter)) : data;
    // TODO implement sorting
    const startPosition: number = Number(page) * Number(limit);
    const endPosition: number = startPosition + Number(limit);
    const paginatedData = searchedData.slice(startPosition, endPosition);

    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                content: paginatedData,
                pagination: {
                    limit: Number(limit),
                    page: Number(page),
                    totalItems: searchedData.length,
                }
            });
        }, 1500);
    })
}
