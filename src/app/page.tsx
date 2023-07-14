"use client";

import ListOperators from "./components/listOperators";
import { keyframes, styled } from "styled-components";

const download = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Download = styled.article`
  max-width: 1440px;
  margin: auto;
  animation: ${download} 0.3s linear;

  @media (max-width: 1435px) {
    width: calc(100% - 40px);
  }
`;

const Title = styled.h1`
  margin: 40px 0 20px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  text-align: center;
  color: #000000;
`;

const Home = () => {
  return (
    <Download>
      <Title>Выберите оператора</Title>
      <ListOperators />
    </Download>
  );
};

export default Home;
