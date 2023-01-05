import React from "react";
import Chart from "react-google-charts";
function PokemonStatsBarChart(props,barChartRef) {
  const data = [["Stats", "Stats Point"]];

  if (props.data !== null) {
    props.data.map((item) => {
      const chartData = [];
      chartData.push(item.text);
      chartData.push(item.value);
      data.push(chartData);
    });
  }
  return (
    <div className="container mt-5" ref={barChartRef}>
      <h2>Pokemon Stats Chart</h2>
      <Chart
        chartType="BarChart"
        width={"1000px"}
        height={"200px"}
        data={data}
        options={{
          title: "Pokemon Ability Chart",
          hAxis: { title: "Stats Point", minValue: 0 },
          vAxis: { title: "Stats" },
          chartArea: { width: "70%" },
        }} 
      />
    </div>
  );
}
export default React.forwardRef(PokemonStatsBarChart);
