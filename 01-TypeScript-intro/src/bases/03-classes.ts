export class Pokemon {
  constructor(public name: string, public readonly id: number) {
  }

}

export const charmander = new Pokemon('Charmander', 4)