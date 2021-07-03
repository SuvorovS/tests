import React from "react";
import { ItemType } from "../server/server";
import { ItemCard } from './ItemCard';

export const Main = ({items}: { items: Array<ItemType>}) => {
    return (
        <div style={{ display: "flex", flexDirection: "row"}}>
            {
                Boolean(items.length) ? items.map(item => <ItemCard key={item.artnumber} item={item} />) : <div>no result</div>
            }

        </div>
    );
}
