import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import Searching from '../components/Searching';
import { Context } from '../context';
import { Welcome } from './styles';
import { PokemonURL } from '../API/types/interfaces';

function App() {
  const [query, setQuery] = useState<string>('');
  const [pokemons, setPokemons] = useState<PokemonURL[]>([]);

  return (
    <Context.Provider
      value={{
        pokemons,
        query,
        setPokemons,
        setQuery,
      }}
    >
      <ErrorBoundary>
        <Searching />
        <Welcome>
          Welcome <br /> to this <br /> PokeProject
        </Welcome>
        <Outlet />
      </ErrorBoundary>
    </Context.Provider>
  );
}

export default App;
