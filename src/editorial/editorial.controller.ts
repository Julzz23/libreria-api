import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { Editorial } from './editorial.entity';
import { validarCuit } from 'src/validaciones/validarCuit';

@Controller('editoriales')
export class EditorialController {
  constructor(private readonly editorialService: EditorialService) {}

  @Get()
  async findAll(): Promise<Editorial[]> {
    return this.editorialService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Editorial> {
    return this.editorialService.findOne(+id);
  }

  @Post()
  async create(@Body() editorial: Editorial): Promise<Editorial> {
    try {
      validarCuit(editorial.cuit);
      return this.editorialService.create(editorial);
    } catch (error) {
      throw new Error('El CUIT ingresado no es válido');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() editorial: Editorial,
  ): Promise<void> {
    try {
      validarCuit(editorial.cuit);
      return this.editorialService.update(+id, editorial);
    } catch (error) {
      throw new Error('El CUIT ingresado no es válido');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.editorialService.remove(+id);
  }
}
