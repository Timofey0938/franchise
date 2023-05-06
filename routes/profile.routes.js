import Router from 'express';
import { Types } from 'mongoose';
import { User } from '../models/User.js';
import { Owner } from '../models/Owner.js';
import { USER, OWNER, ADMIN } from '../constants/roles.js';
import * as dotenv from 'dotenv';

dotenv.config();

const profileRouter = Router();

profileRouter.get('/user/:id', async (req, res) => {
  console.log('eee', req.params);
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

profileRouter.get('/owner/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const owner = await Owner.findById(id);
    res.json(owner);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

profileRouter.post('/user/:userId/add-to-favorites/:franchiseId', async (req, res) => {
  const userId = req.params.userId
  const franchiseId = req.params.franchiseId;
  try {
    const user = await User.findById(userId);
    console.log('fav before:', user.favorites);
    user.favorites.push(franchiseId);
    console.log('fav after:', user.favorites);
    user.save();
    res.json({ massage: 'Добавлено' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

profileRouter.delete('/user/:userId/remove-from-favorites/:franchiseId', async (req, res) => {
  const userId = req.params.userId
  const franchiseId = req.params.franchiseId;
  console.log(userId, franchiseId);
  try {
    const user = await User.findById(userId);
    user.favorites = user.favorites.filter(fav => {
      return fav.toString() !== franchiseId;
    });
    user.save();
    res.json({ massage: 'Удалено' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export { profileRouter };