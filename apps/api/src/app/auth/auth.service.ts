import { AuthCredentialsDto } from '@mono/api-interfaces';
import { User } from '@mono/entities';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRespository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRespository)
    private userRepository: UserRespository,
    private jwtService: JwtService
  ) { }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredentials);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<{token: string}> {
    const username = await this.userRepository.validateUserPassword(authCredentials);
    return ({ token: this.jwtService.sign({ username })});
  }
}
