import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express'
import { ApiBody, ApiConsumes, ApiExtension, ApiProduces, ApiResponse } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService
  ) {}

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiResponse({status: 201, description: 'File created'})
  @ApiResponse({status: 400, description: 'File is not an image'})
  @ApiBody({
    type: FileUploadDto,
    description: `Valid extensions: 'jpg', 'jpeg', 'png', 'gif'`
  })
  uploadProductImage(
    @UploadedFile() 
    file: Express.Multer.File
  ) {
    return this.filesService.uploadProductImage(file);
  }

  @Get('product/:imageName')
  @ApiResponse({status: 200, description: 'Selected file'})
  @ApiResponse({status: 404, description: 'File not found'})
  findProductImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticProductImage(imageName)
    
    res.sendFile(path)
  }
}
