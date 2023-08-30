import { IsEmail, IsNotEmpty, MaxLength, MinLength  } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly userName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8, { message: " The min length of password is 8 " })
  @MaxLength(20, { message: " The password can't accept more than 20 characters " })
  readonly userPass: string;
  
  @IsNotEmpty()
  readonly role?: number;
  
}