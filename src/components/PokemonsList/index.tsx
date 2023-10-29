import { useContext, useEffect, useState } from 'react';
import { PokemonURL } from '../../API/types/interfaces';
import { ContainerWrapper, SearchingList } from '../../styles';
import searchPokemons from '../../utils/sort';
import Pokemon from '../Pokemon';
import { Context } from '../../context';
import SearchInput from '../SearchInput';

export default function PokemonsList() {
  const { pokemons, query } = useContext(Context);

  const [searchedPokemons, setSearchedPokemons] = useState<PokemonURL[]>(pokemons);

  useEffect(() => {
    setSearchedPokemons(searchPokemons(query, pokemons));
  }, [query]);

  return (
    <ContainerWrapper>
      <SearchInput />
      <SearchingList>
        {searchedPokemons.map((pokemon) => (
          <Pokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </SearchingList>
    </ContainerWrapper>
  );
}
