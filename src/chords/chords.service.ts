import { Injectable, NotFoundException } from '@nestjs/common';
import { Chord } from './chord.model';

@Injectable()
export class ChordsService {
  private chords: Chord[] = [];

  insertChord(name: string, notes: string, degree: number) {
    const chordId = Math.random().toString();
    const newChord = new Chord(chordId, name, name.slice(0), notes, degree);
    this.chords.push(newChord);
    return chordId;
  }

  getChords() {
    return [...this.chords];
  }

  getSingleChord(chordId: string) {
    const singleChord = this.findChord(chordId)[0];
    return { ...singleChord };
  }

  updateSingleChord(
    chordId: string,
    name: string,
    notes: string,
    degree: number,
  ) {
    const [singleChord, index] = this.findChord(chordId);
    const updatedChord = { ...singleChord };

    // Simple logic to replace values
    if (name) {
      updatedChord.name = name;
      updatedChord.root = name.slice(0);
    }
    if (notes) {
      updatedChord.notes = notes;
    }
    if (degree) {
      updatedChord.degree = degree;
    }
    // Replace chord with the updated one
    this.chords[index] = updatedChord;
  }

  deleteChord(chordId: string) {
    const [singleChord, index] = this.findChord(chordId);
    this.chords.splice(index, 1);
  }

  // FINDING Chord and chords index
  private findChord(id: string): [Chord, number] {
    const singleChordIndex = this.chords.findIndex((chord) => chord.id === id);
    const singleChord = this.chords[singleChordIndex];
    if (!singleChord) {
      throw new NotFoundException('Could not find the Chord.');
    }
    return [singleChord, singleChordIndex];
  }
}
