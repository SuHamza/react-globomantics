// A Hook that creates side effects
// when a state of a component changes
import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeaturedHouse from "./featured-house";
import SearchResults from "./search-results";
import HouseFilter from "./house-filter";
import HouseFromQuery from "../house/HouseFromQuery";

function App() {
  // Initialize Houses to an empty array
  const [allHouses, setAllHouses] = useState([]);
  // A Hook is a function
  // Whenever a value in the given array changes => fn. executes
  // If Array is empty [] => fn. will only render 
  // the fn. will only run the first time the component renders
  useEffect(() => {
    const fetchHouses = async() => {
      const rsp = await fetch('/houses.json');
      const houses = await rsp.json();
      setAllHouses(houses);
    };
    fetchHouses();
  }, []);

  // Select a random house to feature
  const featuredHouse = useMemo(() => {
    if(allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses]);
  return (
    <Router>
      <div className="container">
        <Header subtitle="Providing Houses All over the World!" />
        <HouseFilter allHouses={allHouses} />
        <Switch>
          <Route path="/searchresults/:country">
            <SearchResults allHouses={allHouses} />
          </Route>
          <Route path="/house/:id">
            <HouseFromQuery allHouses={allHouses} />
          </Route>
          <Route path="/">
            <FeaturedHouse house={featuredHouse}></FeaturedHouse>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
