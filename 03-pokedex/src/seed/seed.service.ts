import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1500',
    );

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const pokemon_number: number = Number(segments[segments.length - 2])
      return {
        name,
        pokemon_number
      }
    })
    return data.results;
  }
}
