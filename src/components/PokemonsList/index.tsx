import { useEffect, useState } from 'react';
import { PokemonURL } from '../../API/types/interfaces';
import { ContainerWrapper, SearchingList } from '../../styles';
import searchPokemons from '../../utils/sort';
import Pokemon from '../Pokemon';
import SearchInput from '../SearchInput';
import { PokemonsListProps } from './types/types';

export default function PokemonsList({ pokemons }: PokemonsListProps) {
  const [query, setQuery] = useState<string>('');
  const [searchedPokemons, setSearchedPokemons] = useState<PokemonURL[]>(pokemons);

  useEffect(() => {
    setSearchedPokemons(searchPokemons(query, pokemons));
  }, [query]);

  return (
    <ContainerWrapper>
      <SearchInput setQuery={(val: string) => setQuery(val)} />
      <SearchingList>
        {searchedPokemons.map((pokemon) => (
          <Pokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </SearchingList>
    </ContainerWrapper>
  );
}
