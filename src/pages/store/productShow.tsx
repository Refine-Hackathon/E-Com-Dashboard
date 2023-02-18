import { useState } from "react";
import { useOne, HttpError } from "@pankod/refine-core";

interface IProduct {
    prdt_id: number;
    product_name: string;
    product_type: string;
    product_details : string;
    gender : string;
    product_cost: number;
}

const handleCart = (e) => {
    e.preventDefault();
    
}

const Product: React.FC = () => {

    const [id, setId] = useState(window.location.pathname.split('/')[6]);
    const [c_name , setc_name] = useState(window.location.pathname.split('/')[4])
   
    const { data, isLoading, isError } = useOne<IProduct, HttpError>({
        resource:  `prdt/${c_name}`,
        id,
    });

    const product = data?.data[0];
    console.log(data?.data[0]);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }

    return (
        <div>
            <h3>Product Details</h3>
            <p>id: {product?.prdt_id}</p>
            <p>name: {product?.product_name}</p>
            <p>cost: {product?.product_cost}</p>
            <br/>
            <button onClick = {handleCart}>add to cart</button>
        </div>
    );
};

export default Product;
