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
    const editorial = await this.editorialService.findOne(+id);
    if (!editorial) {
      throw new NotFoundException(`Editorial with id ${id} not found`);
    }
    return editorial;
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
