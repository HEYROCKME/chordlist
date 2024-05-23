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
    const singleChord = this.chords.find((chord) => chord.id === chordId);
    if (!singleChord) {
      throw new NotFoundException('Could not find the Chord.');
    }
    return { ...singleChord };
  }
}
