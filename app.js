import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth.routes.js';
import { franchiseRouter } from './routes/franchise.routes.js';
import { franchisesRouter } from './routes/franchises.routes.js';
import { profileRouter } from './routes/profile.routes.js';
import { applicationsRouter } from './routes/applications.routes.js';
import { PORT } from './config.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.static('files'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/franchise', franchiseRouter);
app.use('/franchises', franchisesRouter);
app.use('/profile', profileRouter);
app.use('/applications', applicationsRouter);

app.use(function (err, req, res, next) {
  console.log('This is the error ->', err)
  next(err)
})

const port = PORT ?? 5005;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(`listening on port ${port}...`);
    });
  } catch (error) {
    console.log('Server error', error.message);
    process.exit(1);
  }
};

start();