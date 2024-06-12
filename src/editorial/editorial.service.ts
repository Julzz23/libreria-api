import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Editorial } from './editorial.entity';

@Injectable()
export class EditorialService {
  constructor(
    @InjectRepository(Editorial)
    private readonly editorialRepository: Repository<Editorial>,
  ) {}

  async findAll(): Promise<Editorial[]> {
    return this.editorialRepository.find();
  }

  async findOne(id: number): Promise<Editorial | null> {
    return this.editorialRepository.findOne({ where: { id } });
  }

  async create(editorial: Editorial): Promise<Editorial> {
    return this.editorialRepository.save(editorial);
  }

  async update(id: number, editorial: Editorial): Promise<void> {
    await this.editorialRepository.update(id, editorial);
  }

  async remove(id: number): Promise<void> {
    await this.editorialRepository.delete(id);
  }
}
