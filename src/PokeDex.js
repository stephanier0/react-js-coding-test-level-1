import "./App.css";
import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import PokemonListView from "./pokemon/PokemonList";
import ReactPaginate from "react-paginate";

function PokeDex() {
  const [apiResponse, setApiResponse] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltered, setPokemonsFiltered] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const nameFilter = useRef();
  const [offset, setOffset] = useState(0);
  let limit = 20;

  const [allPokemonForFilter, setAllPokemonForFilter] = useState(null);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };

  useEffect(() => {
    // fetch("https://pokeapi.co/api/v2/pokemon")
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((result) => {
    //     setPokemons(result.results);
    //     setPokemonsFiltered(result.results);
    //     setIsLoading(false);
    //   });
    // axios({ url: "https://pokeapi.co/api/v2/pokemon" })
    axios
      .get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          offset: offset,
          limit: limit,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setApiResponse(response.data);
        setPageCount(Math.ceil(response.data.count / limit));
        setPokemons(response.data.results);
        setPokemonsFiltered(response.data.results);
        // below part is to sort the list asc
        // setPokemonsFiltered([...response.data.results].sort((a, b) => (a.name > b.name ? 1 : -1)));
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured during getting the data...");
      });
  }, []);

  function doFilter() {
    const filter = nameFilter.current.value;
    setPokemonsFiltered([]);
    // to allow 1st filter call to fetch all data since it has a lot of pokemon
    if (filter.length === 0) {
      setPokemonsFiltered(pokemons);
    } else {
      if (allPokemonForFilter === null) {
        axios
          .get("https://pokeapi.co/api/v2/pokemon", {
            params: {
              offset: offset,
              limit: apiResponse.count,
            },
          })
          .then((response) => {
            console.log(response);
            setAllPokemonForFilter(response.data.results);
            const temp = [];
            for (const idx in response.data.results) {
              // console.log(response.data.results[idx].name.toLowerCase());
              if (
                response.data.results[idx].name.toLowerCase().includes(filter)
              ) {
                temp.push(response.data.results[idx]);
              }
            }
            setPokemonsFiltered(temp);
            // below part is to sort the list asc
            // setPokemonsFiltered([...response.data.results].sort((a, b) => (a.name > b.name ? 1 : -1)));
          })
          .catch((err) => {
            console.log(err);
            alert("Error occured during getting the data...");
          });
      } else {
        const temp = [];
        for (const idx in allPokemonForFilter) {
          // console.log(response.data.results[idx].name.toLowerCase());
          if (allPokemonForFilter[idx].name.toLowerCase().includes(filter)) {
            temp.push(allPokemonForFilter[idx]);
          }
        }

        setPokemonsFiltered(temp);
      }
    }
  }

  function doSorting(value) {
    if (value.target.value === "ascending") {
      setPokemonsFiltered(
        [...pokemonsFiltered].sort((a, b) => (a.name > b.name ? 1 : -1))
      );
    } else if (value.target.value === "descending") {
      setPokemonsFiltered(
        [...pokemonsFiltered].sort((a, b) => (b.name > a.name ? 1 : -1))
      );
    }
  }

  function toDefaultList() {
    setPokemonsFiltered(pokemons);
  }

  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * limit) % apiResponse.count;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);

    axios
      .get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          offset: newOffset,
          limit: limit,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPokemons(response.data.results);
        setPokemonsFiltered(response.data.results);
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured during getting the data...");
      });
  };

  //added to see react loading longer
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // useEffect(() => {
  //   async function makeRequest() {
  //     await delay(5000);
  //     setIsLoading(false);
  //   }
  //   makeRequest();
  // });

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>
              when hover on the list item , change the item color to yellow.
            </li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <b>Implement loader here</b>
                <ReactLoading type="balls" color="#fff" />
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            <b>Implement Pokedex list here</b>
            <span>
              Filter based on Pokemon Name:{" "}
              <input
                type="text"
                required
                id="nameFilter"
                ref={nameFilter}
                onKeyUp={doFilter}
              ></input>
            </span>
            <div>
              Sort by:{" "}
              <select onChange={doSorting} style={{ fontSize: 16 }}>
                <option value="none">None</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>{" "}
            </div>
            <button style={{ fontSize: 16 }} onClick={toDefaultList}>
              To Default List
            </button>
            <div>
              <PokemonListView pokemon={pokemonsFiltered} />
            </div>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< previous"
              breakLabel="..."
              breakCLassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination justify-content-center"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </>
        )}
      </header>
      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <div hidden="true">
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
  );
}

export default PokeDex;
