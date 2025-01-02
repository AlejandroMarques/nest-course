import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: 'aa2c6c85-886c-40f1-b8fa-91fcb8a5c4c9',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Jhon Doe',
    description: 'User full name',
  })
  @Column()
  fullName: string;

  @ApiProperty({
    example: 'jhondoe@email.com',
    description: 'User email',
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: '$2b$10$8A5jXpCHCjNcxEKhdcueP.9uOe3jtwWz376XsJhSSPOlJ3k9EuLm6',
    description: 'Passwords is returned as a hash'
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example: true,
    description: 'Wheter user is active or not',
    default: true
  })
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    example: ['admin', 'user'],
    description: 'User roles',
    default: ['user']
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3MjYyYjllLTVlOTAtNGM3Ny1iZDQ2LTRlZjVjYTgyNWE5YyIsImlhdCI6MTczNTgyODI0NSwiZXhwIjorNzM1ODM1NDQ1fQ.QQlbBYymrUb_9pS2yNZOvl0KjyEHb77YDjYFj-x3G-1',
    description: 'JWT token, expires in 2h'
  })
  token: string

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @BeforeInsert()
  @BeforeUpdate()
  checkFields() {
    this.email.toLowerCase().trim();
  }
}
