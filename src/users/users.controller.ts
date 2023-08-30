import { Body, Controller, Get, HttpCode, HttpStatus, Post ,Request,
    UseGuards
  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { signInDto } from './dto/sign-in.dto';
import { AuthGuard } from './user.guard';




@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService) {}
    
   
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
      const user =  this.usersService.createUser(createUserDto);
       return user;
    }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: signInDto) {
      return this.usersService.signIn(signInDto.email, signInDto.userPass);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
