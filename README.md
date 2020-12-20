# Mono

This project was generated using [Nx](https://nx.dev).

## Nest js Commands

### Validators

- `yarn add class-transformer class-validator`

```typescript
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
```

### Typeorm

- `yarn add @nestjs/typeorm typeorm pg`

```typescript
import { Task } from '../tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'prisma',
  password: 'prisma',
  database: 'prisma',
  entities: [__dirname + '/../**/*.entity.ts', Task],
  synchronize: true,
};
```

### JWT
- `yarn add @nestjs/jwt @nestjs/passport passport passport-jwt`

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRespository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRespository]),
    JwtModule.register({
      secret: 'topSecret',
      signOptions: { expiresIn: '1h' }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
```