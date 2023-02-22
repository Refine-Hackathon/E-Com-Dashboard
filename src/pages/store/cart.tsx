import {
    useTable,
    HttpError,
} from "@pankod/refine-core";

import CartCard from "components/store/CartCard";

interface Iitem {
    cart_id: number;
    size: string;
    count:number;
    category:string; //men || women
    product_name : string;
    prdt_id : number;
    product_type : string;
    product_details : string;
    product_cost : number;
    img_path : string;
}

export default function Cart() {

  const { tableQueryResult } = useTable<Iitem, HttpError>();
  const items = tableQueryResult?.data?.data ?? [];

  if (tableQueryResult?.isLoading) {
      return <div>Loading...</div>;
  }


  return (
    <div>
    <h1>Cart Details</h1>
    <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Title</th>
                <th>Size</th>
                <th>Cost</th>
                <th>Count</th>
                <th>Total</th>
                <th>Remove</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item , id) => (
              <CartCard item = {item} id = {id}/>
            ))}
        </tbody>
    </table>
    <div className="container">
      <button className="update">
        update cart
      </button>
      <button className="subtotal">
        subtotal
      </button>
      <button className="back-to-shop">
        back to shopping
      </button>
    </div>
</div>
  )
}
