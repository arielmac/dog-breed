"use client";
import { useEffect, useCallback, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import Dogs from './components/dogs';
import Pagination from "./components/pagination"
import Spinner from "react-bootstrap/Spinner";

import { API_BASE, API_KEY, debounce } from "./assets/utils";

export default function Home() {
  const [dogsData, setDogsData] = useState([]);
  const [dogsList, setDogsList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState('name');
  const [orderBy, setOrderBy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the data from the given endpoint
  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      const jsonData = await response.json();
      setDogsData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Get the dogs data on page load
  useEffect(() => {
    fetchData(`${API_BASE}breeds/?api_key=${API_KEY}`);
  },[]);

  // Manage side-effect for sorting the data
  useEffect(() => {
    const newDogsData = [...dogsData];

    newDogsData.sort((dogA, dogB) => {
      if( sortBy === 'name') {
        if (!orderBy) {
          return dogA.name.localeCompare(dogB.name);
        }
        return dogB.name.localeCompare(dogA.name);
      } else if( sortBy === 'lifespan') {
        const dogALifespan = parseInt(dogA.life_span.match(/\d+/));
        const dogBLifespan = parseInt(dogB.life_span.match(/\d+/));
        if (!orderBy) {
          return dogALifespan - dogBLifespan;
        }
        return dogBLifespan - dogALifespan;
      } else if( sortBy === 'height') {
        const dogALifespan = parseInt(dogA.height.imperial.match(/\d+/));
        const dogBLifespan = parseInt(dogB.height.imperial.match(/\d+/));
        if (!orderBy) {
          return dogALifespan - dogBLifespan;
        }
        return dogBLifespan - dogALifespan;
      }
    });
    setDogsList(newDogsData);
    // Always reset the current page to 1 after sorting
    setCurrentPage(1);

  },[dogsData, orderBy, sortBy]);

  // Display the sort arrow depending on the current order status
  const showArrow = () => {
    if (orderBy) {
      return <FaSortDown />;
    }
    return <FaSortUp />;
  };

  // Set the sortBy status
  const onSort = (sortByNew) => {
    if ( sortBy !== sortByNew )
      setOrderBy(false);
    else
      setOrderBy(!orderBy);

    setSortBy(sortByNew);
  };

  // Get the dogs data by search input
  const onSearch = (searchInput) => {
    if(searchInput.length)
      fetchData(`${API_BASE}breeds/search/?api_key=${API_KEY}&q=${searchInput}`);
    else
      fetchData(`${API_BASE}breeds/?api_key=${API_KEY}`);
      
    setSearchText(searchInput);
    setSortBy('name');
    setOrderBy(false);
    setCurrentPage(1);
  }

  // Get current list to display
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentLists = dogsList.slice(indexOfFirstPost, indexOfLastPost);

  // Set current page number for pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="dogs__content">
      <div className="dogs__search-box">
        <label className="dogs__search-label">Search: </label>
        <input
          className="dogs__search-input"
          type="text"
          placeholder="type here..."
          onChange={debounce((e) => onSearch(e.target.value))}
        />
      </div>
      <div className="dogs__result-content">
        <table className="dogs__table">
          <thead>
            <tr>
              <th
                onClick={debounce(() => onSort('name'), 300)}
                className="dogs__thead-name"
                data-column="name"
              >
                <div>
                  <span>Name</span>{" "}
                  {sortBy === "name" ? showArrow() : <FaSort />}
                </div>
              </th>
              <th
                onClick={debounce(() => onSort('lifespan'), 300)}
                className="dogs__thead-lifespan"
                data-column="lifespan"
              >
                <div>
                  <span>Life span</span>{" "}
                  {sortBy === "lifespan" ? showArrow() : <FaSort />}
                </div>
              </th>
              <th
                onClick={debounce(() => onSort('height'), 300)}
                className="dogs__thead-height"
                data-column="height"
              >
                <div>
                  <span>Height</span>{" "}
                  {sortBy === "height" ? showArrow() : <FaSort />}
                </div>
              </th>
              <th>Weight</th>
              <th>Breed Group</th>
              <th>Breed For</th>
              <th>Origin</th>
              <th>Temperament</th>
            </tr>
          </thead>
          <tbody><Dogs dogsData={currentLists} /></tbody>
        </table>
        {!dogsData.length && isLoading ? (
          <div className="dogs__no-result">
            <Spinner />
          </div>
        ) : ''}
        {!dogsData.length && ! isLoading ? (
          <div className="dogs__no-result">
            <h3>No results found</h3>
          </div>
        ) : ''}
        
      </div>
      <Pagination 
        currentPage={currentPage}
        totalPosts={dogsData.length}
        postPerPage={postPerPage}
        paginate={paginate}/>
    </div>
  );
}
