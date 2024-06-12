/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro.entity';
import { Autor } from '../autor/autor.entity';
import { Editorial } from '../editorial/editorial.entity';
import { formatearFecha } from 'src/validaciones/formatearFecha';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
    @InjectRepository(Editorial)
    private readonly editorialRepository: Repository<Editorial>,
  ) {}

  async findAll(): Promise<Libro[]> {
    return this.libroRepository.find({ relations: ['autores', 'editorial'] });
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroRepository.findOne({
      where: { id: id },
      relations: ['autores', 'editorial'],
    });
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }
    return libro;
  }

  async create(libroData: Partial<Libro>): Promise<Libro> {
    const { autores, editorial, ...resto } = libroData;

    const entidadesAutores = await this.autorRepository.findBy(autores);
    if (entidadesAutores.length !== autores.length) {
      throw new BadRequestException('Uno o más autores no encontrados');
    }

    const entidadEditorial = await this.editorialRepository.findOne({
      where: { id: editorial.id },
    });
    if (!entidadEditorial) {
      throw new BadRequestException('Editorial no encontrada');
    }

    const nuevoLibro = this.libroRepository.create({
      ...resto,
      autores: entidadesAutores,
      editorial: entidadEditorial,
    });

    const fechaformateada = formatearFecha(nuevoLibro.fechaLanzamiento);
    nuevoLibro.fechaLanzamiento = fechaformateada;

    return this.libroRepository.save(nuevoLibro);
  }

  async update(id: number, libroData: Partial<Libro>): Promise<Libro> {
    const libro = await this.libroRepository.findOne({
      where: { id: id },
      relations: ['autores', 'editorial'],
    });
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }

    const { autores, editorial, ...resto } = libroData;

    if (autores) {
      const entidadesAutores = await this.autorRepository.findByIds(autores);
      if (entidadesAutores.length !== autores.length) {
        throw new BadRequestException('Uno o más autores no encontrados');
      }
      libro.autores = entidadesAutores;
    }

    if (editorial) {
      const entidadEditorial = await this.editorialRepository.findOne({
        where: { id: editorial.id },
      });
      if (!entidadEditorial) {
        throw new BadRequestException('Editorial no encontrada');
      }
      libro.editorial = entidadEditorial;
    }

    Object.assign(libro, resto);
    return this.libroRepository.save(libro);
  }

  async remove(id: number): Promise<void> {
    const libro = await this.libroRepository.findOne({ where: { id: id } });
    if (!libro) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }
    await this.libroRepository.remove(libro);
  }
}
