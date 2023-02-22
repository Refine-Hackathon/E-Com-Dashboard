import { Request, Response } from 'express';

import { db } from '../index';

export const getProductByCategory = (req: Request, res: Response) => {
  const { category } = req.params;
  const { _end, _start, type } = req.query;
  let query='';
  if (_end !== undefined && _start !== undefined) {
    const end: string = <string>req.query._end;
    const start: string = <string>req.query._start;
    const diff = parseInt(end) - parseInt(start);
    query =
      'SELECT * , count(*) as count from products where category = ' +
      "'" +
      category +
      "'LIMIT " +
      diff +
      ' OFFSET ' +
      _start;
    (';');
  }

  // console.log('end', _end, 'start', _start, 'type', type);
  //console.log(query);

  db.query(query, (err, result2 : Array<any>) => {
    if (err) {
      console.log(err);
      return res.status(500).send([]);
    }
    // console.log(result2[0].count);

    const count = result2? result2[0].count : 0;
    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");
    return res.status(200).json(result2);
  });
};


export const getProductByID = (req: Request, res: Response) => {
  const { id } = req.params;

  const query = 'select * from products where  prdt_id=' + "'" + id + "'" + ';';
  db.query(query, (err, result2) => {
    if (err) {
      console.log(err);
      return res.status(500).send([]);
    }
    // console.log(result2);
    return res.status(200).json(result2);
  });
};
