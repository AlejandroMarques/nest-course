import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {

  @ApiProperty({
    description: 'Product Title (unique)',
    nullable: false,
    minLength: 2,
    example: 'T-shirt 1',
    uniqueItems: true
  })
  @IsString()
  @MinLength(2)
  title: string;


  @ApiPropertyOptional({
    example: 10,
    description: 'Product Price',
    minimum: 0
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit.',
    description: 'Product Description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 't_shirt_1',
    description: 'Product Slug for SEO (created automatically if not provided)',
  })
  @IsString()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional({
    example: 10,
    description: 'Product stock',
    default: 0,
    minimum: 0
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @ApiProperty({
    example: ['XS', 'L', 'XL', 'XXL'],
    description: 'Product sizes',
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];
  
  @ApiProperty({
    example: 'men',
    description: 'Product gender',
    enum: ['men', 'women', 'kid', 'unisex']
  })
  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;

  @ApiPropertyOptional({
    example: ['shirt'],
    description: 'Product tags',
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    example: ["1741111-00-A_0_2000.jpg"],
    description: 'Product images',
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images?: string[];
}

