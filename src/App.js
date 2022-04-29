import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Controls } from "./components/Controls";
import axios from "axios";
import { useState, useEffect } from "react";
import { ALL_COUNTRIES } from "./config";
import { List } from "./components/List";
import { Card } from "./components/Card";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
    fetch(ALL_COUNTRIES)
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        <Controls />
        <List>
          {countries.map((country) => {
            const countryInfo = {
              img: country.flags.png,
              name: country.name.common,
              info: [
                {
                  title: "Population",
                  description: country.population.toLocaleString(),
                },
                {
                  title: "Region",
                  description: country.region,
                },
                {
                  title: "Capital",
                  description: country.capital,
                },
              ],
            };

            return <Card key={country.name.common} {...countryInfo} />;
          })}
        </List>
      </Main>
    </div>
  );
}

export default App;
