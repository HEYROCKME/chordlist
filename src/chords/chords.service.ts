/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Chord } from './chord.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChordsService {
  private chords: Chord[] = [];

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
    return singleChord;
  }

  updateSingleChord(
    chordId: string,
    chordName: string,
    notes: string,
    degree: number,
  ) {
    // const [singleChord, index] = this.findChord(chordId);
    // const updatedChord = { ...singleChord };
    // // Simple logic to replace values
    // if (chordName) {
    //   updatedChord.chordName = chordName;
    //   updatedChord.root = chordName.slice(0);
    // }
    // if (notes) {
    //   updatedChord.notes = notes;
    // }
    // if (degree) {
    //   updatedChord.degree = degree;
    // }
    // // Replace chord with the updated one
    // this.chords[index] = updatedChord;
  }

  deleteChord(chordId: string) {
    // const [singleChord, index] = this.findChord(chordId);
    // this.chords.splice(index, 1);
  }

  // FINDING Chord and chords index
  private async findChord(id: string): Promise<Chord> {
    let chord;
    try {
      chord = await this.chordModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find the Chord.');
    }
    if (!chord) {
      throw new NotFoundException('Could not find the Chord.');
    }
    return {
      id: chord.id,
      chordName: chord.chordName,
      notes: chord.notes,
      root: chord.root,
      degree: chord.degree,
    };
  }
}
