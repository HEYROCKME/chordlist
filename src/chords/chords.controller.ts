// Adding a new Controller for the chords

// Nest Decorators
import { Controller, Post, Body, Get } from '@nestjs/common';
// Service (injectable)
import { ChordsService } from './chords.service';

@Controller('chords')
export class ChordsController {
  constructor(private readonly chordsService: ChordsService) {}

  // POST REQUEST
  @Post()
  addChord(
    @Body('name') chordName: string,
    @Body('notes') chordNotes: string,
    @Body('degree') chordDegree: number,
  ): any {
    const generatedID = this.chordsService.insertChord(
      chordName,
      chordNotes,
      chordDegree,
    );
    return { id: generatedID };
  }
  // GET REQUEST
  @Get()
  getAllChords() {
    return this.chordsService.getChords();
  }
}
