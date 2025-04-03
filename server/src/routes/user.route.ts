import express, { Request, Response } from 'express';
import logger from '../../utils/logger'

const router = express.Router();
const users = [{
  name: 'Jorn',
  id: 0,
  department: 'IT',
  dateHired: new Date('2022-09-02T16:27:24.999Z')
}, {
  name: 'Markus',
  id: 3,
  department: 'HR',
  dateHired: new Date('2023-01-24T16:27:24.999Z')
}, {
  name: 'Andrew',
  id: 2,
  department: 'HR',
  dateHired: new Date('2022-03-22T16:27:24.999Z')
}, {
  name: 'Ori',
  id: 4,
  department: 'FINANCE',
  dateHired: new Date('2019-07-04T16:27:24.999Z')
}, {
  name: 'Mike',
  id: 1,
  department: 'IT',
  dateHired: new Date('2010-12-16T16:27:24.999Z')
}] as const;

router.get('/', (req: Request, res: Response) => {
  try{
    const {sort} = req.query;

    let sortedUsers = [...users]
    let dash = typeof sort === 'string' && sort.substring(0,1) === '-';
    let dashSort = typeof sort === 'string' && sort.substring(1,sort.length);
  
    if (sort && typeof sort === "string" && users[0].hasOwnProperty(sort) && !dash){
      sortedUsers.sort((a,b) => (a[sort as keyof typeof a] > b[sort as keyof typeof b] ? 1 : -1));
      logger.info(`Sorted users by ${sort}`)
    }
    else if (sort && typeof sort === "string" && users[0].hasOwnProperty(dashSort) && dash){
      sortedUsers.sort((a,b) => (a[dashSort as keyof typeof a] < b[dashSort as keyof typeof b] ? 1 : -1));
      logger.info(`Sorted users by ${sort}`)
    }
    res.json(sortedUsers);
  } catch (error){
    logger.error('Error in getUsers API:', error);
    res.status(500).json({error: 'Internal Server Error'})
  }
  
});

router.get('/:id', (req: Request, res: Response) => {
  try{
    const id = parseInt(req.params.id);

    if (isNaN(id) || id < 0){
      res.status(400).json({error: "Invalid id"});
    }

    else if (!(users.some(user => user.id === id))){
      res.status(404).json({error: "User with that id does not exist"});
    }
  
    let userIndex = users.findIndex(user => user.id === id);
    let foundUser = users[userIndex];
    let foundUserDate = foundUser.dateHired;

    var time = Date.now() - foundUserDate.getTime();
    
    const aDayInMs = 24 * 60 * 60 * 1000

    const daysDiff = Math.round(time / aDayInMs);
    

    res.json(foundUser);
  } catch(error){
    res.status(500).json({error: "Internal Server Error"});
  }
  //add extra field that is lengthOfEmployment on response
  // figure out how to add extra field, users array does not allow for extra field? manipulation necessary
});

export default router;