import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  
  constructor(private readonly productService: ProductsService) {}
  
  async runSeed() {
    await this.insertNewProducts()
    return 'Seed executed'
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();
    const products = initialData.products
    const promises = []
    
    products.forEach(product => {
      promises.push(this.productService.create(product))
    })

    await Promise.all(promises)

    return true
  }
}
