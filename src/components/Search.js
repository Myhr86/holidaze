import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "./hotels/useAxios";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const [, setError] = useState(null);

  const http = useAxios();

  var myHotels = [];

  useEffect(function() {
    async function getMedia() {
      try {
        const response = await http.get("wp/v2/pages");
        response.data.map(val => {
          if (val.slug.includes("_")) {
            myHotels.push(val);
            setAllData(myHotels);
            setFilteredData([]);
          }
        });
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
      <div className="searchField__container">
        <FontAwesomeIcon id="searchIcon" icon={faSearch} />
        <input
          id="searchBar"
          placeholder="Search accommodations here..."
          type="text"
          autoComplete="off"
          onChange={event => handleSearch(event)}
        />
      </div>
      <div className="resultContainer">
        {filteredData.map((value, index) => {
          let para = value.excerpt.rendered;
          let hotelDesc = para.slice(3, -14);
          let removeDesc = hotelDesc.replace("Available Rooms", "");
          let newDesc = removeDesc.replace("Free Wifi", "");
          let wifi = value.content.rendered.match("Free Wifi");
          let rooms = value.content.rendered.match("Available Rooms");

          return (
            <div className="resContainer" key={value.id}>
              <Link to={`/details/${value.id}`}>
                <div className="res">
                  <h3>{value.title.rendered}</h3>
                  <p className="res__para">{newDesc}</p>
                  <p className="res__wifi">{wifi}</p>
                  <p className="res__rooms">{rooms}</p>
                  <hr />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
