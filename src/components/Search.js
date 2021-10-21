import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "./hotels/useAxios";

export default function Search() {
  const [allData,setAllData] = useState([]);
  const [filteredData,setFilteredData] = useState(allData);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(function () {
  async function getMedia() {
    try {
      const response = await http.get("wp/v2/pages");
      console.log("response", response.data);
      setAllData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
      setError(error.toString("Something went wrong.."));
    }
  }

  getMedia();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (event) =>{
    let value = event.target.value.toLowerCase();
    let result = [];

    result = allData.filter((data) => {
      console.log(data.slug)
      let toLower = data.title.rendered.toLowerCase();

      if (toLower.search(value) !== -1) {
        return data.title.rendered.search(value);
      }
    });

    setFilteredData(result);
  }

  return (
    <div className="searchField">
      <div>
        <input id="searchBar" placeholder="Search..." type="text" onChange={(event) =>handleSearch(event)} />
      </div>
      <div style={{padding:10}}>
        {filteredData.map((value,index)=>{
        return(
        <div key={value.id}>
          <div className="res">
          <Link to={`/details/${value.id}`}>
            {value.title.rendered}
          </Link>
          </div>
        </div>
        )
        })}
      </div>
    </div>
  );

}
