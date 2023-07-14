"use client";

import { useState, createContext } from "react";

import { initialOperators } from "./shared/data";
import GlobalStyle from "./styles/globalStyles";
import { IOpertarorsContext } from "./shared/operators.interface";

export const ContextOperators = createContext<Partial<IOpertarorsContext>>({});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [operators, setOperators] = useState(initialOperators);

  const addOperator = (value: string) => {
    const nextOperators = [
      ...operators,
      {
        id: operators[operators.length - 1].id + 1,
        name: value,
        img: "/logo-sim.png",
      },
    ];

    setOperators(nextOperators);
  };

  const getOperator = (id: number) => {
    return operators.find((operator) => operator.id === id);
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <GlobalStyle />
        <ContextOperators.Provider
          value={{ operators, getOperator, addOperator }}
        >
          {children}
        </ContextOperators.Provider>
      </body>
    </html>
  );
};

export default RootLayout;
