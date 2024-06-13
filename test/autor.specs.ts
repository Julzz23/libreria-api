import { Test, TestingModule } from '@nestjs/testing';
import { AutorService } from '../src/autor/autor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Autor } from '../src/autor/autor.entity';
import { Repository, UpdateResult } from 'typeorm'; // Import UpdateResult from typeorm

describe('AutorService', () => {
  let servicio: AutorService;
  let repositorio: Repository<Autor>;

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        AutorService,
        {
          provide: getRepositoryToken(Autor),
          useClass: Repository,
        },
      ],
    }).compile();

    servicio = modulo.get<AutorService>(AutorService);
    repositorio = modulo.get<Repository<Autor>>(getRepositoryToken(Autor));
  });

  it('debería encontrar todos los autores', async () => {
    const autoresTest: Autor[] = [
      {
        id: 1,
        nombre: 'Autor Test',
        dni: '12345678',
        apellido: 'Apellido Test',
        nacionalidad: 'Nacionalidad Test',
      },
    ];
    jest.spyOn(repositorio, 'find').mockResolvedValue(autoresTest);

    expect(await servicio.findAll()).toEqual(autoresTest);
  });

  it('debería encontrar un autor', async () => {
    const autorTest: Autor = {
      id: 1,
      nombre: 'Autor Test',
      dni: '12345678',
      apellido: 'Apellido Test',
      nacionalidad: 'Nacionalidad Test',
    };
    jest.spyOn(repositorio, 'findOne').mockResolvedValue(autorTest);

    expect(await servicio.findOne(1)).toEqual(autorTest);
  });

  it('debería crear un autor', async () => {
    const autorTest: Autor = {
      id: 1,
      nombre: 'Autor Test',
      dni: '12345678',
      apellido: 'Apellido Test',
      nacionalidad: 'Nacionalidad Test',
    };
    jest.spyOn(repositorio, 'save').mockResolvedValue(autorTest);

    expect(await servicio.create(autorTest)).toEqual(autorTest);
  });

  it('debería actualizar un autor', async () => {
    const autorTest: Autor = {
      id: 1,
      nombre: 'Autor update',
      dni: '12345678',
      apellido: 'Apellido update',
      nacionalidad: 'Nacionalidad update',
    };
    jest
      .spyOn(repositorio, 'update')
      .mockResolvedValue({ affected: 1 } as UpdateResult);

    await servicio.update(1, autorTest);
    expect(repositorio.update).toHaveBeenCalledWith(1, autorTest);
  });
});
