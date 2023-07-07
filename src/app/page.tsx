"use client";

import ListOperators from "./components/listOperators";
import { styled } from "styled-components";

const Article = styled.article`
  max-width: 600px;
  margin: auto;
  padding: 50px;
  box-shadow: 0 15px 30px 0 rgba(20, 27, 36, 0.1);
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
