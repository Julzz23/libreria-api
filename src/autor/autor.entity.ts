import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Autor {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ unique: true })
  dni!: string;

  @Column()
  nacionalidad!: string;
}
