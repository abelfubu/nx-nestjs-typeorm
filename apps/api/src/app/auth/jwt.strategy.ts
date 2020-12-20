import { JwtPayload } from '@mono/api-interfaces';
import { User } from '@mono/entities';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRespository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRespository) private userRepository: UserRespository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret'
    });
  }

  async validate({ username }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({ username });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}