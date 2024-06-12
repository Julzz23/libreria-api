// src/book/book.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Autor } from '../autor/autor.entity';
import { Editorial } from '../editorial/editorial.entity';

@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  categoria: string;

  @Column('decimal')
  precio: number;

  @Column()
  fechaLanzamiento: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => Autor)
  @JoinTable()
  autores: Autor[];

  @ManyToOne(() => Editorial)
  editorial: Editorial;
}
