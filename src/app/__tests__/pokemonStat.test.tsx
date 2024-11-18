import { render, screen } from '@testing-library/react';
import PokemonStat from '../components/pokemonStat';

describe('PokemonStat Component', () => {
  it('renders with correct height format and data', () => {
    render(<PokemonStat dataKey="Height" dataValue="10" />);
    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(screen.getByText("10'")).toBeInTheDocument();
  });

  it('renders with correct weight format and data', () => {
    render(<PokemonStat dataKey="Weight" dataValue="100" />);
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("100 lbs")).toBeInTheDocument();
  });

  it('renders with correct pokemon type data', () => {
    render(<PokemonStat dataKey="Type" dataValue="Psychic" />);
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Psychic")).toBeInTheDocument();
  });
});
