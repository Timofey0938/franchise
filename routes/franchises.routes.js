import Router from 'express';
import { Franchise } from '../models/Franchise.js';
import { User } from '../models/User.js';

const franchisesRouter = Router();

franchisesRouter.get('/', async (req, res) => {
    const { sort, ...filter } = req.query;

    const filterConfig = {};

    for (const key in filter) {
      if (key === 'categories') {
        filterConfig.categories = { '$in': filter.categories.split(';') };
      } else {
        const [direction, value] = filter[key].split(';');
        filterConfig[key] = { [direction]: +value };
      }
    }

    filterConfig.verificated = true;

    const [ field, direction ] = sort.split(';');
    const sortConfig = { [field]: +direction };

    const franchises = await Franchise.find(filterConfig).sort(sortConfig);
    franchises.forEach(fr => console.log(fr.name));
    res.json(franchises);
  }
);

franchisesRouter.get('/favorite/:userId', async (req, res) => {
  const userId = req.params.userId
  const user = await User.findById(userId);
  const franchises = await Franchise.find({ _id: {'$in': user.favorites } });
  franchises.forEach(fr => console.log(fr.name));
  res.json(franchises);
});

export { franchisesRouter };