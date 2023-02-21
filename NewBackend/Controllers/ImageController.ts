import fs from 'fs';
import { Request, Response } from 'express';
import path from 'path';
export const getImage = (req: Request, res: Response) => {
  console.log(__dirname);
  var data = fs.readFileSync(path.join(__dirname, '../../Images/a.jpg'));
  res.end(data);
};
