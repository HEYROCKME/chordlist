/* eslint-disable prettier/prettier */
// Adding a new Controller for the chords

// Nest Decorators
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
// Service (injectable)
import { ChordsService } from './chords.service';

@Controller('chords')
export class ChordsController {
  constructor(private readonly chordsService: ChordsService) {}

  // POST REQUEST
  @Post()
  async addChord(
    @Body('name') chordName: string,
    @Body('notes') chordNotes: string,
    @Body('degree') chordDegree: number,
  ): Promise<any> {
    const generatedID = await this.chordsService.insertChord(
      chordName,
      chordNotes,
      chordDegree,
    );
    return { id: generatedID };
  }
  // GET REQUESTs
  @Get()
  // Get all Chords
  async getAllChords() {
    const chords = await this.chordsService.getChords();
    return chords;
  }
  // Get Single Chord
  @Get(':id')
  getChord(@Param('id') chordId: string) {
    return this.chordsService.getSingleChord(chordId);
  }

  @Patch(':id')
  async updateChord(
    @Param('id') chordId: string,
    @Body('chordName') chordName: string,
    @Body('notes') chordNotes: string,
    @Body('degree') chordDegree: number,
  ) {
    await this.chordsService.updateSingleChord(
      chordId,
      chordName,
      chordNotes,
      chordDegree,
    );
    return null;
  }

  @Delete(':id')
  async removeChord(@Param('id') chordId: string) {
    await this.chordsService.deleteChord(chordId);
    return null;
  }
}
