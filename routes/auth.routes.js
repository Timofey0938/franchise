import Router from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Owner } from '../models/Owner.js';
import { Admin } from '../models/Admin.js';
import { USER, OWNER, ADMIN } from '../constants/roles.js';
import * as dotenv from 'dotenv';

dotenv.config();

const authRouter = Router();

authRouter.post(
  '/register',
  [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Пароль не удовлетворяет требованиям').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    check('lastName', 'Фамилия имеет невалидную длину').isLength({ min: 2, max: 100 }),
    check('firstName', 'Имя имеет невалидную длину').isLength({ min: 2, max: 100 }),
    check('middleName', 'Слишком длинное отчество').isLength({ max: 100 }),
    check('phoneNumber', 'Телефон имеет невалидную длину').isLength({ min: 11, max: 11 }),
    check('sex').isIn(['Мужской', 'Женский']),
    check('about', 'Поле о себе имеет невалидную длину').isLength({ min: 3, max: 2000 }),
    check('experience', 'Поле опыт имеет невалидную длину').isLength({ min: 3, max: 2000 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }
      const { email, password } = req.body;

      const [existingUser, existingOwner] = await Promise.all([
        User.findOne({ email }),
        Owner.findOne({ email }),
      ]);

      if (existingUser || existingOwner) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует'});
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ ...req.body, password: hashedPassword, favorites: [] });
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token, userId: user.id, role: USER });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка регистрации'});
    }
  }
);

authRouter.post(
  '/register-owner',
  [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Пароль не удовлетворяет требованиям').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    check('lastName', 'Фамилия имеет невалидную длину').isLength({ min: 2, max: 100 }),
    check('firstName', 'Имя имеет невалидную длину').isLength({ min: 2, max: 100 }),
    check('middleName', 'Слишком длинное отчество').isLength({ max: 100 }),
    check('phoneNumber', 'Телефон имеет невалидную длину').isLength({ min: 11, max: 11 }),
    check('sex').isIn(['Мужской', 'Женский'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        });
      }
      const { email, password } = req.body;

      const [existingUser, existingOwner] = await Promise.all([
        User.findOne({ email }),
        Owner.findOne({ email }),
      ]);

      if (existingUser || existingOwner) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует'});
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const owner = new Owner({ ...req.body, password: hashedPassword });
      await owner.save();

      const token = jwt.sign(
        { userId: owner.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token, userId: owner.id, role: OWNER });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка регистрации'});
    }
  }
);

authRouter.post('/login',
  [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Пароль не удовлетворяет требованиям').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  ],
  async (req, res) => {
    console.log('login', req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе',
        });
      }
      const { email, password } = req.body;

      const [admin, user, owner] = await Promise.all([
        Admin.findOne({ email }),
        User.findOne({ email }),
        Owner.findOne({ email }),
      ]);

      if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
          return res.status(400).json({ message: 'Неверный пароль'});
        }

        const token = jwt.sign(
          { userId: admin.id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return res.json({ token, userId: admin.id, role: ADMIN });
      }

      if (owner) {
        const isMatch = await bcrypt.compare(password, owner.password);

        if (!isMatch) {
          return res.status(400).json({ message: 'Неверный пароль'});
        }

        const token = jwt.sign(
          { userId: owner.id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return res.json({
          token,
          userId: owner.id,
          role: OWNER,
          hasFranchise: owner.franchise,
        });
      }

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ message: 'Неверный пароль'});
        }

        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        return res.json({ token, userId: user.id, role: USER });
      }

      res.status(400).json({ message: 'Пользователь с таким email не найден' });    
    } catch (error) {
      res.status(500).json({ message: `${error}` });
    }
  }
);

export { authRouter };