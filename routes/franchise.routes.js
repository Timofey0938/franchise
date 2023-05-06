import Router from 'express';
import { upload } from '../middlewares/upload.js';
import { Franchise } from '../models/Franchise.js';
import { Owner } from '../models/Owner.js';
import { User } from '../models/User.js';

const franchiseRouter = Router();

const uploadMiddleware = upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'presentation', maxCount: 1 },
  { name: 'finPlan', maxCount: 1 },
  { name: 'logo', maxCount: 1 },
  { name: 'procuration', maxCount: 1 },
]);

franchiseRouter.post(
  '/create',
  uploadMiddleware,
  async (req, res) => {
    const cover = req.files.cover[0].filename;
    const gallery = req.files.gallery.map(photo => photo.filename);
    const presentation = req.files.presentation[0].filename;
    const finPlan = req.files.finPlan[0].filename;
    const logo = req.files.logo[0].filename;
    const procuration = 'procuration' in req.files ? req.files.procuration[0].filename : null;

    try {
      const { ownerId, ...franchiseData } = req.body;

      const existingFranchise = await Franchise.findOne({ name: franchiseData.name });

      if (existingFranchise) {
        return res.status(400).json({ message: 'Франшиза с таким названием уже существует'});
      }
      const franchise = new Franchise({
        ...franchiseData,
        categories: franchiseData.categories.split(';'),
        rate: 0,
        purchases: 0,
        views: 0,
        reviews: [],
        verificated: false,
        cover,
        gallery,
        presentation,
        finPlan,
        logo,
        procuration,
      });

      await franchise.save();
      const owner = await Owner.findById(ownerId);
      owner.franchise = franchise.id;
      owner.save();
      res.json(franchise.id);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

franchiseRouter.post('/reject', async (req, res) => {
  const cover = req.files.cover[0].filename;
  const gallery = req.files.gallery.map(photo => photo.filename);
  const presentation = req.files.presentation[0].filename;
  const finPlan = req.files.finPlan[0].filename;
  const logo = req.files.logo[0].filename;
  const procuration = 'procuration' in req.files ? req.files.procuration[0].filename : null;

  try {
    const { ownerId, ...franchiseData } = req.body;

    const existingFranchise = await Franchise.findOne({ name: franchiseData.name });

    if (existingFranchise) {
      return res.status(400).json({ message: 'Франшиза с таким названием уже существует'});
    }
    const franchise = new Franchise({
      ...franchiseData,
      categories: franchiseData.categories.split(';'),
      rate: 0,
      purchases: 0,
      views: 0,
      reviews: [],
      cover,
      gallery,
      presentation,
      finPlan,
      logo,
      procuration,
    });

    await franchise.save();
    const owner = await Owner.findById(ownerId);
    owner.franchise = franchise.id;
    owner.save();
    res.json(franchise.id);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});



franchiseRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const userId = req.query?.userId;
  console.log(userId);
  try {
    const franchise = await Franchise.findById(id);
    let isFavorite = false;

    if (userId) {
      const user = await User.findById(userId);
      if (user.favorites.includes(franchise._id)) {
        isFavorite = true;
      }
    }
    const response = userId ? { franchise, isFavorite } : franchise;
    res.json(response);
    franchise.views++;
    franchise.save();
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export { franchiseRouter };