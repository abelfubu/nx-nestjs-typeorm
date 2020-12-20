import { AuthCredentialsDto } from '@mono/api-interfaces';
import { User } from '@mono/entities';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get()
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) credentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(credentials);
  }
  
  @Post('/signin')
  signIn(@Body(ValidationPipe) credentials: AuthCredentialsDto): Promise<{ token: string }> {
    return this.authService.signIn(credentials);
  }

  @Delete(':id') 
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.authService.deleteUser(id);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user)
  }
}
