import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

  @ApiPropertyOptional({
    default: 10,
    description: 'How many items do you need',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({
    default: 0,
    description: 'How many items do you want to skip',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}