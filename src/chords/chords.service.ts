import { Injectable } from '@nestjs/common';
import { Chord } from './chord.model';

@Injectable()
export class ChordsService {
  chords: Chord[] = [];

  insertChord(name: string, notes: string, degree: number) {
    const newChord = new Chord(
      new Date().toString(),
      name,
      name.slice(0),
      notes,
      degree,
    );
    this.chords.push(newChord);
  }
}
