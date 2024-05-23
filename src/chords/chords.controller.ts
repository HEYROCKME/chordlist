// Adding a new Controller for the chords

import { Controller } from '@nestjs/common';
import { ChordsService } from './chords.service';

@Controller('chords')
export class ChordsController {
  constructor(private readonly chordsService: ChordsService) {}
  @Post()
  addChord(): any {
    this.chordsService.insertChord();
  }
}
