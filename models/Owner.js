import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  sex: { type: String, required: true },
  birthDate: { type: String, required: true },
  passportSeries: { type: String, required: true },
  passportNumber: { type: String, required: true },
  passportIssuePlace: { type: String, required: true },
  passportIssueDate: { type: String, required: true },
  franchise: { type: Types.ObjectId },
});

export const Owner = model('Owner', schema);