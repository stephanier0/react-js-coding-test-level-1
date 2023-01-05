function PokemonStateTable(props) {  
  return (
    <div>
      <table style={{ display: "flex", justifyContent: "center",  alignItems: "center"}}>
        <tbody >
            <tr key="title">
              <th style={{color: "black", "textAlign": "center", border: "2px solid lightblue", padding : "8px"}}>
              <b>Stats Description</b></th>
              <th style={{color: "black", "textAlign": "center", border: "2px solid lightblue", padding : "8px"}}>Value</th>
            </tr>
          {props.pokemonStats.map((eachStat) => (
            <tr key={eachStat.stat.name}>
              <th style={{color: "green", "textAlign": "left", border: "2px solid lightblue", padding : "5px"}}>{eachStat.stat.name}</th>
              <th style={{color: eachStat.base_stat < 50 ? "red" : "green", "textAlign": "left", border: "2px solid lightblue", padding : "5px"}}>{eachStat.base_stat}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonStateTable;
