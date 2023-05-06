import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  franchiseId: { type: Types.ObjectId, required: true, unique: true },
});

export const DevelopApplication = model('DevelopApplication', schema);