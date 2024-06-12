import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './autor.entity';
import { validarDNI } from 'src/validaciones/validarDNI';

@Injectable()
export class AutorService {
  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}

  async findAll(): Promise<Autor[]> {
    return this.autorRepository.find();
  }

  async findOne(id: number): Promise<Autor | null> {
    return this.autorRepository.findOne({ where: { id } });
  }
  async create(autor: Autor): Promise<Autor> {
    try {
      validarDNI(autor.dni);
      return this.autorRepository.save(autor);
    } catch (error) {
      throw new Error('El DNI ingresado no es válido');
    }
  }

  async update(id: number, autor: Autor): Promise<void> {
    try {
      validarDNI(autor.dni);
      await this.autorRepository.update(id, autor);
    } catch (error) {
      throw new Error('El DNI ingresado no es válido');
    }
  }

  async remove(id: number): Promise<void> {
    await this.autorRepository.delete(id);
  }
}
