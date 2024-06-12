import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './libro.entity';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { Autor } from '../autor/autor.entity';
import { Editorial } from '../editorial/editorial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Libro, Autor, Editorial])],
  providers: [LibroService],
  controllers: [LibroController],
})
export class LibroModule {}
