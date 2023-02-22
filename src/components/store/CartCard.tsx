import React from 'react'
import { useState } from "react";
import img from '../../assets/men.jpg'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
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

export default function CartCard({item  , id }) {

    const compute = (cost :number , count : number) => {
        return cost * count;
      }
    const [count, setcount] = useState(item.count);
    const [total , settotal] = useState(compute(item.product_cost , item.count));
    const cost =  item.product_cost;
    const increment =  (e) =>{
        e.preventDefault();
        setcount(count+1);
        settotal(total + cost);
    }

    const decrement = async (e) =>{
        e.preventDefault();
        setcount(count-1);
        settotal(total-cost );
    }


  return (
   <tr key={id}
   className='card_row'>
                    <td className='card_image'>
                      <img className="cart_img" height={'100px'} width={'100px'} src = {img}/>
                    </td>
                    <td className='card_title'>{item.product_name}</td>
                    <td className='card_size'>{item.size}</td>
                    <td className='card_cost'>₹{item.product_cost}</td>
                    <td>
                      <button className="cnt_btn" onClick = {decrement}>- </button>
                      <span className="card_count">{count}</span>
                      <button className="cnt_btn" onClick = {increment} >+</button>
                      </td>
                    <td className='card_total'>₹{total}</td>
                    <td>
                      <button className="delete">
                        <HighlightOffOutlinedIcon/>
                      </button>
                    </td>
    </tr>
  )
}
