import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AutorService } from './autor.service';
import { Autor } from './autor.entity';

@Controller('autores')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Get()
  async findAll(): Promise<Autor[]> {
    return this.autorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Autor> {
    const autor = await this.autorService.findOne(+id);
    if (!autor) {
      throw new NotFoundException(`Autor with ID ${id} not found`);
    }
    return autor;
  }

  @Post()
  async create(@Body() autor: Autor | null | undefined): Promise<Autor> {
    if (autor === null || autor === undefined) {
      // Handle the case when autor is null or undefined
      throw new Error('Autor cannot be null or undefined');
    }
    return this.autorService.create(autor);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() autor: Autor): Promise<void> {
    return this.autorService.update(+id, autor);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.autorService.remove(+id);
  }
}
