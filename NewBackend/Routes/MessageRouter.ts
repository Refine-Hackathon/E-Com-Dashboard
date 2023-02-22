import * as express from 'express';
import {postMessage} from '../Controllers/ManageController'
const messageRouter = express.Router();



 messageRouter.post('/', postMessage);

 export default messageRouter;