import { useEffect, useState } from 'react';
import { Pokemon as PokemonType } from '../../API/types/interfaces';
import { ContainerWrapper, Row } from '../../styles';
import searchPokemons from '../../utils/sort';
import Pokemon from '../Pokemon';
import SearchInput from '../SearchInput';
import { PokemonsListProps } from './types/types';

export default function PokemonsList({ pokemons }: PokemonsListProps) {
  const [query, setQuery] = useState<string>('');
  const [searchedPokemons, setSearchedPokemons] = useState<PokemonType[]>(pokemons);

  useEffect(() => {
    setSearchedPokemons(searchPokemons(query, pokemons));
  }, [query]);

  return (
    <ContainerWrapper>
      <SearchInput setQuery={(val: string) => setQuery(val)} />
      <Row>
        {searchedPokemons.map((pokemon) => (
          <Pokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </Row>
    </ContainerWrapper>
  );
}
