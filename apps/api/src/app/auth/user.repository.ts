import { User } from "@mono/entities";
import { AuthCredentialsDto } from "@mono/api-interfaces";
import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compare, genSalt, hash} from 'bcrypt';

@EntityRepository(User)
export class UserRespository extends Repository<User> {
  async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
    const salt = await genSalt(2);
    const user = new User();
    user.username = username;
    user.password = await hash(password, salt);

    try {
      await user.save();
    } catch (error) {
      console.log(error.code)
      if (error.code === '23505') { // Duplicate username
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword({ username, password }: AuthCredentialsDto) {
    const user = await this.findOne({ username });
    if (!user) {
      throw new NotFoundException(`User with username ${username} was not found`);
    }
    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid Password')
    }
    return user.username;
  }
}