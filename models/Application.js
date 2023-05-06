import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  franchiseId: { type: Types.ObjectId, required: true, unique: true },
  ownerId: { type: Types.ObjectId, required: true },
  status: { type: String, required: true },
  rejectionReason: { type: String },
});

export const Application = model('Application', schema);