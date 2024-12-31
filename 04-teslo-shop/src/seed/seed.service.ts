import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  
  async runSeed() {
    await this.deleteDb()
    const adminUser = await this.insertUsers()
    await this.insertNewProducts(adminUser)
    return 'Seed executed'
  }

  private async deleteDb () {
    await this.productService.deleteAllProducts()
    const queryBuilder = this.userRepository.createQueryBuilder()
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async insertUsers() {
    const seedUsers = initialData.users
    const users: User[] = []
    
    seedUsers.forEach(user => {
      users.push(this.userRepository.create(user))
    })

    const dbUsers = await this.userRepository.save(seedUsers)

    return dbUsers[0]
  }

  private async insertNewProducts(user: User) {
    await this.productService.deleteAllProducts();
    const products = initialData.products
    const promises = []
    
    products.forEach(product => {
      promises.push(this.productService.create(product, user))
    })

    await Promise.all(promises)

    return true
  }
}
