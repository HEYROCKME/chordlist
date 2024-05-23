import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChordsModule } from './chords/chords.module';

@Module({
  imports: [ChordsModule], //nest link to ChordsModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
