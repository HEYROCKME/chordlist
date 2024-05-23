import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChordsModule } from './chords/chords.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ChordsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'), //Loaded
      }),
    }),
  ], //nest link to ChordsModule
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
