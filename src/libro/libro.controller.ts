import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { LibroService } from './libro.service';
import { Libro } from './libro.entity';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  async findAll(): Promise<Libro[]> {
    return this.libroService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Libro> {
    return this.libroService.findOne(+id);
  }

  @Post()
  async create(@Body() libroData: Partial<Libro>): Promise<Libro> {
    return this.libroService.create(libroData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() libroData: Partial<Libro>,
  ): Promise<Libro> {
    return this.libroService.update(+id, libroData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.libroService.remove(+id);
  }
}
