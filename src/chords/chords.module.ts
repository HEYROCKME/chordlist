import { Module } from '@nestjs/common';
import { ChordsController } from './chords.controller';
import { ChordsService } from './chords.service';

@Module({
  controllers: [ChordsController],
  providers: [ChordsService],
})
export class ChordsModule {}
