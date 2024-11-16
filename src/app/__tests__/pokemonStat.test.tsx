import { render, screen } from '@testing-library/react';
import PokemonStat from '../components/pokemonStat';

describe('PokemonStat Component', () => {
  it('renders with correct data', () => {
    render(<PokemonStat dataKey="Height" dataValue="10" units="'" />);
    expect(screen.getByText("Height")).toBeInTheDocument();
    expect(screen.getByText("10'")).toBeInTheDocument();
  });
});
