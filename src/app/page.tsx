"use client";

import ListOperators from "./components/listOperators";
import { styled } from "styled-components";

const Article = styled.article`
  max-width: 1440px;
  margin: auto;
  padding: 50px;
`;

const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  text-align: center;
  color: #000000;
`;

const Home = () => {
  return (
    <Article>
      <Title>Выберите оператора</Title>
      <ListOperators />
    </Article>
  );
};

export default Home;
