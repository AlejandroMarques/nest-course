import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  
  @Get()
  @ApiBearerAuth()
  @ApiResponse({status: 200, description: 'Database filled with test data'})
  executeSeed() {
    return this.seedService.runSeed();
  }
}
