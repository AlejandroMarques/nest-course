import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
export class LoginUserResponseDto extends LoginUserDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3MjYyYjllLTVlOTAtNGM3Ny1iZDQ2LTRlZjVjYTgyNWE5YyIsImlhdCI6MTczNTgyODI0NSwiZXhwIjorNzM1ODM1NDQ1fQ.QQlbBYymrUb_9pS2yNZOvl0KjyEHb77YDjYFj-x3G-1',
    description: 'JWT token, expires in 2h'
  })
  token: string

  @ApiProperty({
    example: '$2b$10$8A5jXpCHCjNcxEKhdcueP.9uOe3jtwWz376XsJhSSPOlJ3k9EuLm6',
    description: 'Passwords is returned as a hash'
  })
  password: string;
}