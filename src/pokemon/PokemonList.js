import PokemonListDetail from "./PokemonListDetail";

function PokemonListView(props) {
  // receive list of pokemon detail only
  return (
    <ol style={{ listStyle: "none" , textAlign:"center"}}>
      {props.pokemon.map((item) => (
        <PokemonListDetail each={item} key={item.name} />
      ))}
    </ol>
  );
}

export default PokemonListView;
