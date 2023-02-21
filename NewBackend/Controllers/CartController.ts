import { Request, Response } from 'express'
import { db } from '../index';
export const addToCart = (req: Request, res: Response) => {
  const query1 = 'SELECT * from `cart` where user_id = "'+req.body.uid+'" and prdt_id = "'+req.body.pid+'"';
  const query2 = 'INSERT INTO `cart` (`user_id` , `prdt_id`) VALUES ('+req.body.uid+' , '+req.body.pid +')';
  
  db.query(query1 , (err , result : Array<any>) => {
      if(err)
      {   console.log(err);
          return res.status(500).json({msg:err})
      }
      if(result.length == 0)
      {
          db.query(query2 , (err , result) => {
              if(err){return res.status(500).json({msg:'something went wrong at q2'});}
              console.log('cart updated');
              return res.status(200).json({msg:'success'});
          })
      }else{
          var cnt = result[0].count;
          const cid = result[0].cart_id;
          cnt += 1;
          console.log(cnt)
          const query3 = 'UPDATE `cart` SET `count` = "'+ cnt +'" WHERE `cart_id` = "'+cid+'"';
          db.query(query3 , (err , result) => {
              if(err){return res.status(500).json({msg:'something went wrong at q3'});}
              console.log('cart updated');
              return res.status(200).json({msg:'success'});
          })
      }
  })

}

