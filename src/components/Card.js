import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.article`
  border-radius: var(--radii);
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  cursor: pointer;
  overflow: hidden;
`;
const CardImage = styled.img`
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  box-shadow: var(--shadow);

  @media (min-width: 1024px) {
    height: 150px;
  }
`;
const CardBody = styled.div`
  padding: 1rem 1.5rem 1.5rem;
`;
const CardTitle = styled.h3`
  margin: 0;
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
`;
const CardList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem 0 0;
`;
const CardListItem = styled.li`
  font-size: var(--fs-sm);
  line-height: 1.5;
  font-weight: var(--fs-light);
  & > b {
    font-weight: var(--fw-bold);
  }
`;

export const Card = ({ img, name, info = [], onClick }) => {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate(`country/${name}`)}>
      <CardImage src={img} alt={name} />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <CardList>
          {info.map((item) => (
            <CardListItem key={item.title}>
              <b>{item.title}</b> {item.description}
            </CardListItem>
          ))}
        </CardList>
      </CardBody>
    </Wrapper>
  );
};
