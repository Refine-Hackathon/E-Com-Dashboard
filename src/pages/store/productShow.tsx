import { useState } from "react";
import { useOne, HttpError, useShow } from "@pankod/refine-core";

interface IProduct {
    prdt_id: number;
    product_name: string;
    product_type: string;
    product_details : string;
    gender : string;
    product_cost: number;
}

const Product: React.FC = () => {

    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;
    const product = record?.[0];
    return (
        <div>
            <h3>Product Details</h3>
            <p>id: {product?.prdt_id}</p>
            <p>name: {product?.product_name}</p>
            <p>cost: {product?.product_cost}</p>
            <br/>
            <button>add to cart</button>
        </div>
    );
};

export default Product;
