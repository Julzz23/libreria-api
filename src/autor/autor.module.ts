import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from './autor.entity';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Autor])],
  providers: [AutorService],
  controllers: [AutorController],
})
export class AutorModule {}
