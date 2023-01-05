import { useState, useRef } from "react";
import React from "react";
import Modal from "react-modal";
import PokemonStatsTable from "./PokemonStatsTable";
import PokemonStatsBarChart from "./PokemonStatsBarChart";
import jsPDF from "jspdf";

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
      setShow(true);
      const url = props.each.url;
      fetch(url)
        .then((data) => {
          return data.json();
        })
        .then((response) => {
          eachPokemonData = response;
          setEachPokemonState(eachPokemonData);

          spritesData = response.sprites;
          setSprites(spritesData);

          let statsData = [];
          let chartLabel = [];
          for (const idx in response.stats) {
            const idxItem = { ...response.stats[idx] };
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
        });
    }
  }

  function downloadAsPDF() {
    console.log("donlot");  
    console.log(downloadPdfRef.current);
    console.log(barChartRef.current); 
     
    const doc = new jsPDF();
    doc.html(downloadPdfRef.current, {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
      html2canvas: { scale: 0.2 },
    });
  }

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
                <button onClick={downloadAsPDF}>Download as PDF</button>
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
