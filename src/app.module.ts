import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroModule } from './libro/libro.module';
import { AutorModule } from './autor/autor.module';
import { EditorialModule } from './editorial/editorial.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'julian',
      password: 'julian',
      database: 'libreria-node',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    LibroModule,
    AutorModule,
    EditorialModule,
  ],
})
export class AppModule {}
