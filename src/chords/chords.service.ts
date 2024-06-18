/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Chord } from './chord.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChordsService {
  constructor(@InjectModel('Chord') private chordModel: Model<Chord>) {} //Mongoose constuctor function

  async insertChord(chordName: string, notes: string, degree: number) {
    const newChord = new this.chordModel({
      chordName: chordName,
      notes: notes,
      root: chordName.slice(0),
      degree,
    });
    const result = await newChord.save(); // Mongoose Save method
    return result.id;
  }

  async getChords() {
    //return result from mongoDB
    const chords = await this.chordModel.find().exec();

    return chords.map((chord) => ({
      id: chord.id,
      chordName: chord.chordName,
      notes: chord.notes,
      root: chord.root,
      degree: chord.degree,
    }));
  }

  async getSingleChord(chordId: string) {
    const singleChord = await this.findChord(chordId);
    return {
      id: singleChord.id,
      chordName: singleChord.chordName,
      notes: singleChord.notes,
      root: singleChord.root,
      degree: singleChord.degree,
    };
  }

  async updateSingleChord(
    chordId: string,
    chordName: string,
    notes: string,
    degree: number,
  ) {
    const updatedChord = await this.findChord(chordId);

    // Simple logic to replace values
    if (chordName) {
      updatedChord.chordName = chordName;
      updatedChord.root = chordName.slice(0);
    }
    if (notes) {
      updatedChord.notes = notes;
    }
    if (degree) {
      updatedChord.degree = degree;
    }
    // Replace chord with the updated one
    updatedChord.save();
  }

  async deleteChord(chordId: string) {
    const result = await this.chordModel.deleteOne({ _id: chordId }).exec();
    console.log('delete request', result);
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find the Chord.');
    }
  }

  // FINDING Chord and chords index
  private async findChord(id: string): Promise<Chord> {
    let chord;
    try {
      chord = await this.chordModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find the Chord.');
    }
    if (!chord) {
      throw new NotFoundException('Could not find the Chord.');
    }
    return chord;
  }
}
