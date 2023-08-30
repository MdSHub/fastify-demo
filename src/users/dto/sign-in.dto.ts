import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  userPass: string;
}