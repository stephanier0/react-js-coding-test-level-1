import PokemonListDetail from "./PokemonListDetail";

function PokemonListView(props) {
  return (
    <ol style={{ listStyle: 'none' }}>
      {props.pokemon.map((item) => (
        <PokemonListDetail each={item} />
      ))}
    </ol>
  );
}

export default PokemonListView;
