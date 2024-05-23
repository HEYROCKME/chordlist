import { Injectable } from '@nestjs/common';
import { Chord } from './chord.model';

@Injectable()
export class ChordsService {
  chords: Chord[] = [];

  insertChord(name: string, notes: string, degree: number) {
    const chordId = new Date().toString();
    const newChord = new Chord(chordId, name, name.slice(0), notes, degree);
    this.chords.push(newChord);
    return chordId;
  }
}
