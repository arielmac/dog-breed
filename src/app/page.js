"use client";
import { useEffect, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import Dogs from './components/dogs';
import Pagination from "./components/pagination"
import Spinner from "react-bootstrap/Spinner";

import { API_BASE, API_KEY, debounce } from "./assets/utils";

export default function Home() {
  const [dogsData, setDogsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState('name');
  const [orderBy, setOrderBy] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(15);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    
    if (searchText.length) {
      fetchData(`${API_BASE}breeds/search/?api_key=${API_KEY}&q=${searchText}`);
    } else {
      fetchData(`${API_BASE}breeds/?api_key=${API_KEY}`);
    }
  }, [searchText]);

  const sortByName = () => {
    setOrderBy(!orderBy);
    setSortBy('name');
    const newDogsData = [...dogsData];
    newDogsData.sort((dogA, dogB) => {
      if (!orderBy) {
        return dogA.name.localeCompare(dogB.name);
      }
      return dogB.name.localeCompare(dogA.name);
    });
    setDogsData(newDogsData);
    setCurrentPage(1);
  };

  const sortLifeSpan = () => {
    setOrderBy(!orderBy);
    setSortBy('lifespan');

    const newDogsData = [...dogsData];
    newDogsData.sort((dogA, dogB) => {
      const dogALifespan = parseInt(dogA.life_span.match(/\d+/));
      const dogBLifespan = parseInt(dogB.life_span.match(/\d+/));

      if (!orderBy) {
        return dogALifespan - dogBLifespan;
      }
      return dogBLifespan - dogALifespan;
    });
    setDogsData(newDogsData);
    setCurrentPage(1);
  };

  const sortHeight = () => {
    setOrderBy(!orderBy);
    setSortBy('height');

    const newDogsData = [...dogsData];
    newDogsData.sort((dogA, dogB) => {
      const dogAHeight = parseInt(dogA.height.imperial.match(/\d+/));
      const dogBHeight = parseInt(dogB.height.imperial.match(/\d+/));

      if (!orderBy) {
        return dogAHeight - dogBHeight;
      }
      return dogBHeight - dogAHeight;
    });
    setDogsData(newDogsData);
    setCurrentPage(1);
  };

  const showArrow = () => {
    if (orderBy) {
      return <FaSortDown />;
    }
    return <FaSortUp />;
  };

  // Get current list to display
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentLists = dogsData.slice(indexOfFirstPost, indexOfLastPost);

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
          onChange={debounce((e) => setSearchText(e.target.value))}
        />
      </div>
      <div className="dogs__result-content">
        <table className="dogs__table">
          <thead>
            <tr>
              <th
                onClick={debounce(() => sortByName(), 300)}
                className="dogs__thead-name"
                data-column="name"
              >
                <div>
                  <span>Name</span>{" "}
                  {sortBy === "name" ? showArrow() : null}
                </div>
              </th>
              <th
                onClick={debounce(() => sortLifeSpan(), 300)}
                className="dogs__thead-lifespan"
                data-column="lifespan"
              >
                <div>
                  <span>Life span</span>{" "}
                  {sortBy === "lifespan" ? showArrow() : null}
                </div>
              </th>
              <th
                onClick={debounce(() => sortHeight(), 300)}
                className="dogs__thead-height"
                data-column="height"
              >
                <div>
                  <span>Height</span>{" "}
                  {sortBy === "height" ? showArrow() : null}
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
