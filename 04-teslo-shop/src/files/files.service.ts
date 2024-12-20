import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}
  uploadProductImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }

    const host = this.configService.get('HOST_API')

    if(!host) throw new Error('HOST_API not defined in .env')

    const secureUrl = `${host}/files/product/${file.filename}`;

    return { secureUrl };
  }

  getStaticProductImage(imageName: string) {
    const path = join(__dirname, '../../static/products', imageName);

    if (!existsSync(path))
      throw new NotFoundException(`No product found with image ${imageName}`);
    return path;
  }
}
