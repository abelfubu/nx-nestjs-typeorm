import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task, User } from '@mono/entities';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'prisma',
  password: 'prisma',
  database: 'prisma',
  entities: [Task, User],
  synchronize: true,
};
