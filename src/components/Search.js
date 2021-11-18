import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "./hotels/useAxios";

export default function Search() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [error, setError] = useState(null);
  const [searchField, setSearchField] = useState(false);

  const http = useAxios();

  var myHotels = [];

  useEffect(function() {
    async function getMedia() {
      try {
        const response = await http.get("wp/v2/pages");
        console.log("response", response.data);
        {
          response.data.map(val => {
            if (val.slug.includes("_")) {
              myHotels.push(val);
              setAllData(myHotels);
              setFilteredData([]);
            }
          });
        }
      } catch (error) {
        console.log(error);
        setError(error.toString("Something went wrong.."));
      }
    }

    getMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = event => {
    let value = event.target.value.toLowerCase();
    let result = [];
    if (value.length === 0) {
      let res = document.querySelector("div .searchField");
      res.style.background = "none";
    } else {
      result = allData.filter(data => {
        let res = document.querySelector("div .searchField");
        res.style.background = "black";
        let toLower = data.title.rendered.toLowerCase();

        if (toLower.search(value) !== -1) {
          return data.title.rendered.search(value);
        }
      });
    }

    setFilteredData(result);
  };

  return (
    <div className="searchField">
      <div>
        <input
          id="searchBar"
          placeholder="Search..."
          type="text"
          autoComplete="off"
          onChange={event => handleSearch(event)}
        />
      </div>
      <div style={{ padding: 10 }}>
        {filteredData.map((value, index) => {
          return (
            <div className="resContainer" key={value.id}>
              <div className="res">
                <Link to={`/details/${value.id}`}>{value.title.rendered}</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
