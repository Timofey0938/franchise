import Router from 'express';
import { Franchise } from '../models/Franchise.js';
import { Application } from '../models/Application.js';
import { ACCEPTED, MODERATING, REJECTED } from '../constants/statuses.js';

const applicationsRouter = Router();

applicationsRouter.get('/', async (req, res) => {
  console.log('get')
  try {
    const applications = await Application.find({ status: MODERATING });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

applicationsRouter.post('/create', async (req, res) => {
  try {
    const { franchiseId, ownerId } = req.body;
    console.log(franchiseId);
    const existingApplication = await Application.findOne({ franchiseId });

    if (existingApplication) {
      return res.status(400).json({ message: 'Заявка для этой франшизы уже существует'});
    }

    const application = new Application({
      franchiseId,
      ownerId,
      status: MODERATING,
    });

    await application.save();
    res.json({ message: 'Заявка создана' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

applicationsRouter.post(':id/reject', async (req, res) => {
  const applicationId = req.params.id;
  try {
    const application = await Application.findById(applicationId);
    application.status = REJECTED;
    application.rejectionReason = req.body.reason;
    await application.save();
    res.json({ message: 'Заявка отклонена' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

applicationsRouter.post(':id/accept', async (req, res) => {
  const applicationId = req.params.id;
  try {
    const application = await Application.findById(applicationId);
    const franchise = await Franchise.findById(application.franchiseId);
    application.status = ACCEPTED;
    if (application.rejectionReason) {
      delete application.rejectionReason;
    }
    franchise.verificated = true;
    await Promise.all([
      application.save(),
      franchise.save()
    ]);
    res.json({ message: 'Заявка принята' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export { applicationsRouter };