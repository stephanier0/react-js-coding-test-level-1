import PokemonListDetail from "./PokemonListDetail";

function PokemonListView(props) {
  // receive list of pokemon detail only
  return (
    <ol style={{ listStyle: "none" }}>
      {props.pokemon.map((item) => (
        <PokemonListDetail each={item} key={item.name} />
      ))}
    </ol>
  );
}

export default PokemonListView;
