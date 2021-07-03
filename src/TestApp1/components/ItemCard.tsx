import {ItemType} from "../server/server";
import React from "react";

export const ItemCard = ({ item }: { item: ItemType }) => {
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
