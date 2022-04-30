import React, { useState, useEffect } from "react";
import { Controls } from "../components/Controls";
import { List } from "../components/List";
import { Card } from "../components/Card";
import { ALL_COUNTRIES } from "../config";

export const HomePage = ({ countries, setCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    if (!countries.length) {
      fetch(ALL_COUNTRIES)
        .then((response) => response.json())
        .then((data) => setCountries(data));
    }
  }, []);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  const handleSearch = (search, region) => {
    let data = [...countries];
    if (region) {
      data = data.filter((country) => country.region.includes(region));
    }
    if (search) {
      data = data.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredCountries(data);
  };
  return (
    <>
      <Controls onSearch={handleSearch} />
      <List>
        {filteredCountries.map((country) => {
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
    </>
  );
};
