import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'jhondoe@email.com',
    description: 'User email',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Jhon Doe',
    description: 'User full name',
    minLength: 3
  })
  @IsString()
  @MinLength(3)
  fullName: string;

  @ApiProperty({
    example: 'Password1234',
    description: 'User password. The password must have a Uppercase, lowercase letter and a number',
    minLength: 8,
    maxLength: 50
  })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
