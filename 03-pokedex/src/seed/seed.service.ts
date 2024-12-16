import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService, 
    private readonly http: AxiosAdapter
  ) {}

  async executeSeed() {
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=17000',
    );

    const insertPromisesArray = []

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const pokemon_number: number = Number(segments[segments.length - 2]);
      const pokemon:CreatePokemonDto = {
        name,
        pokemon_number,
      };

      insertPromisesArray.push(this.pokemonService.create(pokemon))
    });

    await Promise.all(insertPromisesArray)
    return data.results;
  }
}
