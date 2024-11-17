import { render, screen } from '@testing-library/react';
import PokemonStat from '../components/pokemonStat';

describe('PokemonStat Component', () => {
  it('renders with correct height format and data', () => {
    render(<PokemonStat dataKey="Height" dataValue="10" units="'" />);
    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(screen.getByText("10'")).toBeInTheDocument();
  });

  it('renders with correct weight format and data', () => {
    render(<PokemonStat dataKey="Weight" dataValue="100" units="lbs" />);
    expect(screen.getByText("Weight")).toBeInTheDocument();
    expect(screen.getByText("100lbs")).toBeInTheDocument();
  });
});
