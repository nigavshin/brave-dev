"use client";

import { useContext } from "react";
import { styled } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { ContextOperators } from "../layout";

const List = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  flex: 1;
  margin: 15px;
`;

const LightSpan = styled.span`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  background-color: #ffffff;
  box-shadow: 0 15px 30px 0 rgba(20, 27, 36, 0.1);
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    border: 1px solid #2c6a66;
  }
`;

const AddButtonSpan = styled.span`
  display: inline-block;
  margin: 15px 0 0 15px;
  padding: 15px 30px;
  box-shadow: 0 15px 30px 0 rgba(20, 27, 36, 0.1);
  border-radius: 10px;
  border: 1px solid transparent;
  color: #000;
  cursor: pointer;

  &:hover {
    border: 1px solid #2c6a66;
  }

  @media (max-width: 560px) {
    display: block;
    margin: 15px auto 15px;
  }
`;

const Subtitle = styled.h2`
  margin: 20px 0 0;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  text-align: center;
  color: #000000;
`;

const ListOperators = () => {
  const { operators } = useContext(ContextOperators);

  return (
    <>
      <List>
        {operators &&
          operators.map((operator) => (
            <ListItem key={operator.id}>
              <Link href={`/payment/${operator.id}`}>
                <LightSpan>
                  <Image
                    src={operator.img}
                    width={40}
                    height={40}
                    alt={"Operator-" + operator.name}
                    priority={true}
                  />
                  <Subtitle>{operator.name}</Subtitle>
                </LightSpan>
              </Link>
            </ListItem>
          ))}
      </List>

      <Link href="/add-operator">
        <AddButtonSpan> Другой оператор +</AddButtonSpan>
      </Link>
    </>
  );
};

export default ListOperators;
