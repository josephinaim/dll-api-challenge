import express, { Request, Response } from 'express';
import logger from '../../utils/logger'

const router = express.Router();
const users = [{
  name: 'Jorn',
  id: 0,
}, {
  name: 'Markus',
  id: 3,
}, {
  name: 'Andrew',
  id: 2,
}, {
  name: 'Ori',
  id: 4,
}, {
  name: 'Mike',
  id: 1,
}];

router.get('/', (req: Request, res: Response) => {
  try{
    const {sort} = req.query;

    let sortedUsers = [...users]
  
    if (sort && typeof sort === "string" && users[0].hasOwnProperty(sort)){
      sortedUsers.sort((a,b) => (a[sort as keyof typeof a] > b[sort as keyof typeof b] ? 1 : -1));
      logger.info(`Sorted users by ${sort}`)
    }
    res.json(sortedUsers);
  } catch (error){
    logger.error('Error in getUsers API:', error);
    res.status(500).json({error: 'Internal Server Error'})
  }
  
});

export default router;