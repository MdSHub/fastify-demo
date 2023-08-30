import { IsString, IsNotEmpty, MaxLength, MinLength, isString  } from 'class-validator';

export class CreateTaskDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: " The min length of taskName is 3 " })
  @MaxLength(20, { message: " The taskName can't accept more than 20 characters " })
  readonly taskName: string;

  @IsNotEmpty()
  @IsString()
  readonly taskDescription: string;
  
}