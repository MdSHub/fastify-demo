import { Injectable,UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
    private jwtService: JwtService
    ){}
   
    async createUser(createUserDto: CreateUserDto): Promise<any> {
        //uniuqe email check
       const existing =await this.usersRepository.findOne({ where: { email : String(createUserDto.email) } });
       if(existing){
        return { message: 'Email Already Exist' };
       }
        const user = this.usersRepository.create(createUserDto);
        await this.usersRepository.save(user);
        return { message: 'User created successfully' };
      }

      async signIn(email: string, userPass: string): Promise<User|any> {
        const user = await this.usersRepository.findOne({ where: { email : String(email) } });
        if (user?.userPass !== userPass) {
          throw new UnauthorizedException();
        }
        
        // TODO: Generate a JWT and return it here
        // instead of the user object

        const payload = { sub: user.id, username: user.userName };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    
      }
}
