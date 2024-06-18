/* eslint-disable prettier/prettier */

import * as mongoose from 'mongoose';

// Define a Mongoose Schema for the model
export const ChordSchema = new mongoose.Schema({
  // Beware Uses JS TYPES!!
  chordName: { type: String, required: true },
  notes: { type: String, required: true },
  root: { type: String, required: true },
  degree: { type: Number, requred: true },
});

export interface Chord extends mongoose.Document {
  id: string;
  chordName: string;
  notes: string;
  root: string;
  degree: number;
}
