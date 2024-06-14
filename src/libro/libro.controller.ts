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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('libros')
@ApiTags('libros')
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
  @ApiBody({ type: Libro, description: 'Crea un nuevo libro' })
  @ApiResponse({
    status: 201,
    description: 'El libro ha sido creado exitosamente.',
    type: Libro,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
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
