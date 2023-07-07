import { useState } from "react";
import { initialOperators } from "../data/data";
import PayForm from "./paymentForm";
import { styled } from "styled-components";


type InitialOperators = typeof initialOperators;

const ListOperators = () => {
  const [name, setName] = useState("");
  const [showPayForm, setShowPayForm] = useState<InitialOperators[0] | null>(
    null
  );
  const [showAddForm, setshowAddForm] = useState(false);
  const [operators, setOperators] = useState(initialOperators);

  function handleClickAddOperator() {
    const nextOperators = [
      ...operators,
      { id: operators[operators.length - 1].id + 1, name: name, img: "s" },
    ];

    setOperators(nextOperators);
    setName("");
  }

  const handleClickShowForm = (operator: InitialOperators[0]) => {
    setShowPayForm(operator);
  };

  function handleClickShowAddForm() {
    setshowAddForm(!showAddForm);
  }

  const List = styled.ul`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  `;

  const ListItem = styled.li`
    margin: 15px;
  `;

  const LightButton = styled.button`
    padding: 15px;
    box-shadow: 0 15px 30px 0 rgba(20, 27, 36, 0.1);
    cursor: pointer;
  `;

  return (
    <>
      <List>
        {operators.map((operator) => (
          <ListItem key={operator.id}>
            <LightButton onClick={() => handleClickShowForm(operator)}>
              <img src={operator.img} width={100} height={100} />
              {operator.name}
            </LightButton>
          </ListItem>
        ))}
      </List>
      {showPayForm && <PayForm showPayForm={showPayForm} />}

      <LightButton type="button" onClick={handleClickShowAddForm}>
        +
      </LightButton>
      {showAddForm && (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleClickAddOperator}>Add</button>
        </>
      )}
    </>
  );
};

export default ListOperators;
