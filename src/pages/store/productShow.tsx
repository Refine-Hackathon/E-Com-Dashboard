import { useState } from "react";
import { useOne, HttpError, useShow } from "@pankod/refine-core";
import { host } from "utils/api";
interface IProduct {
    prdt_id: number;
    product_name: string;
    product_type: string;
    product_details : string;
    gender : string;
    product_cost: number;
}

const handleClick = (e,prdt_id:number) => {
   e.preventDefault();
   const uid = localStorage.getItem('uid');
   console.log(uid);
   const data = {
    'uid':uid,
    'pid':prdt_id,
    }
    fetch(`${host}/cart` , { method:'post', headers:{'Accept':'application/json' , 'Content-Type':'application/json'} , body:JSON.stringify(data) })
    .then(data => data.json())
    .then(data => {
        console.log(data.msg)
        if(data.msg === 'success')
        {
            alert('cart updated');
            return;
        }else{
            alert('something went wrong ,try again');
            return;
        }
    } )

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
            <button onClick={ (e) => handleClick(e ,product.prdt_id)}>add to cart</button>
        </div>
    );
};

export default Product;
