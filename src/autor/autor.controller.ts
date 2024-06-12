import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
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
    return this.autorService.findOne(+id);
  }

  @Post()
  async create(@Body() autor: Autor): Promise<Autor> {
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
