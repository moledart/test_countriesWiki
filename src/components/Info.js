import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;
const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;
const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  line-height: 1.8;
  & > b {
    font-weight: var(--fw-bold);
  }
`;
const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;
const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  cursor: pointer;
`;

export const Info = (props) => {
  const navigate = useNavigate();

  const {
    name,
    flags,
    population,
    region,
    subregion,
    tld = [],
    currencies,
    languages,
    capital,
    borders,
  } = props;

  const [neighbours, setNeighbours] = useState([]);

  useEffect(() => {
    const codes = borders?.join(",");
    fetch(BASE_URL + "alpha?codes=" + codes)
      .then((res) => res.json())
      .then((data) => setNeighbours(data));
  }, [borders]);

  const findUrl = (country) => {};

  return (
    <Wrapper>
      <InfoImage src={flags.png} alt={name.common} />
      <div>
        <InfoTitle>{name.common}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Name: </b> {Object.values(name.nativeName)[0].official}
            </ListItem>
            <ListItem>
              <b>Population: </b> {population}
            </ListItem>
            <ListItem>
              <b>Region: </b> {region}
            </ListItem>
            <ListItem>
              <b>Sub Region: </b> {subregion}
            </ListItem>
            <ListItem>
              <b>Capital: </b> {capital}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domain: </b>{" "}
              {tld.map((domain) => (
                <span key={domain}>{domain}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Currency: </b> {<span>{Object.values(currencies)[0].name} </span>}
            </ListItem>
            <ListItem>
              <b>Languages: </b>{" "}
              {Object.values(languages).map((lang) => (
                <span key={lang}>{lang} </span>
              ))}
            </ListItem>
          </List>
        </ListGroup>
        <Meta>
          <b>Border Countries</b>
          {!borders?.length ? (
            <span>There are no border countries</span>
          ) : (
            <TagGroup>
              {neighbours.map((neighbour) => (
                <Tag
                  key={neighbour.name.common}
                  onClick={() => navigate(`/country/${neighbour.name.common}`)}
                >
                  {neighbour.name.common}
                </Tag>
              ))}
            </TagGroup>
          )}
        </Meta>
      </div>
    </Wrapper>
  );
};
