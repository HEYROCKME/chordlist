import { Module } from '@nestjs/common';
import { ChordsController } from './chords.controller';
import { ChordsService } from './chords.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChordSchema } from './chord.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chord', schema: ChordSchema }]),
  ],
  controllers: [ChordsController],
  providers: [ChordsService],
})
export class ChordsModule {}
