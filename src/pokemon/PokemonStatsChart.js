import BarChart from "react-bar-chart";
 
function PokemonStatsChart(props) {
  const chartConfig = {
    backgroundGradientFrom: "#0EFF29",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#0EFF29",
    backgroundGradientToOpacity: 0.5,
    backgroundColor: "#0EFF29",  
    borderColor:"#0EFF29",  
    propsForLabels: {
      fontSize: "5",
    },
  };
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
 
  return (
    <BarChart
      withCustomBarColorFromData={true}
      chartConfig={{ chartConfig }}
      label="Pokemon Stats Chart"
      width={500}
      height={500}
      margin={margin}
      data={props.label}
    />
  );
}

export default PokemonStatsChart;
