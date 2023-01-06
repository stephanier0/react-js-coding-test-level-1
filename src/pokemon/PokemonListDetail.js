import { useState, useRef } from "react";
import React from "react";
import Modal from "react-modal";
import PokemonStatsTable from "./PokemonStatsTable";
import PokemonStatsBarChart from "./PokemonStatsBarChart";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

function PokemonListDetail(props) {
  const [hover, setHover] = useState(false);
  const [pokemonDetailInfo, setPokemonDetailInfo] = useState(false);
  const [show, setShow] = useState(false);
  const [eachPokemonState, setEachPokemonState] = useState(false);

  const [sprites, setSprites] = useState(false);
  const [stats, setStats] = useState([]);

  const [labelChart, setLabelChart] = useState([]);

  let spritesData = null;
  let eachPokemonData = null;

  const downloadPdfRef = useRef(null);
  const barChartRef = useRef(null);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      color: "black",
    },
    overlay: { backgroundColor: "grey" },
  };

  function toogleDetail() {
    if (show) {
      setShow(false);
      eachPokemonData = null;
      setPokemonDetailInfo(false);
    } else {
      // const url = props.each.url;
      // fetch(url)
      //   .then((data) => {
      //     return data.json();
      //   })
      //   .then((response) => {
      //     eachPokemonData = response;
      //     setEachPokemonState(eachPokemonData);

      //     spritesData = response.sprites;
      //     setSprites(spritesData);

      //     let statsData = [];
      //     let chartLabel = [];
      //     for (const idx in response.stats) {
      //       const idxItem = { ...response.stats[idx] };
      //       statsData.push(idxItem);

      //       const tempItemChart = {
      //         text: idxItem.stat.name,
      //         value: idxItem.base_stat,
      //       };
      //       chartLabel.push(tempItemChart);
      //     }
      //     setStats(statsData);
      //     setLabelChart(chartLabel);
      //     setPokemonDetailInfo(true);
      //   });
      axios({ url: props.each.url })
        .then((response) => {
          eachPokemonData = response.data;
          setEachPokemonState(eachPokemonData);

          spritesData = response.data.sprites;
          setSprites(spritesData);

          let statsData = [];
          let chartLabel = [];
          for (const idx in response.data.stats) {
            const idxItem = { ...response.data.stats[idx] };
            statsData.push(idxItem);

            const tempItemChart = {
              text: idxItem.stat.name,
              value: idxItem.base_stat,
            };
            chartLabel.push(tempItemChart);
          }
          setStats(statsData);
          setLabelChart(chartLabel);
          setPokemonDetailInfo(true);
        })
        .catch((err) => {
          console.log(err);
          alert("Error occured during getting the data...");
        });

      setShow(true);
    }
  }
  const handlePrint = useReactToPrint({
    content: () => downloadPdfRef.current,
  });
  
  return (
    <div>
      <li
        key={props.each.name}
        style={{ color: hover ? "yellow" : "white" }}
        id={props.each.name}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={toogleDetail}
      >
        {props.each.name}
      </li>
      <div
        hidden={!show}
        style={{ display: show ? "block" : "none", position: "initial" }}
      >
        {show && (
          <Modal
            isOpen={show}
            contentLabel={show?.name || ""}
            onRequestClose={() => {
              setShow(false);
            }}
            style={customStyles}
            ariaHideApp={false}
          >
            {pokemonDetailInfo && labelChart.length !== 0 && (
              <div style={{ textAlign: "center" }} ref={downloadPdfRef}>
                <h1> Pokemon Name: {eachPokemonState.name} </h1>
                <img alt={eachPokemonState.name} src={sprites.front_default} />
                <h3> Stats: </h3>
                <PokemonStatsTable pokemonStats={stats} />
                <PokemonStatsBarChart data={labelChart} ref={barChartRef} />
                <button onClick={handlePrint}>Download as PDF</button>
              </div>
            )}
            <div id="test">
              Requirement:
              <ul>
                <li>show the sprites front_default as the pokemon image</li>
                <li>
                  Show the stats details - only stat.name and base_stat is
                  required in tabular format
                </li>
                <li>Create a bar chart based on the stats above</li>
                <li>
                  Create a buttton to download the information generated in this
                  modal as pdf. (images and chart must be included)
                </li>
              </ul>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default PokemonListDetail;
