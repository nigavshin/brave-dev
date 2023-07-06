import { useState } from "react";
import { initialOperators } from "../data/data";
import PayForm from "./paymentForm";

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
      { id: operators[operators.length - 1].id + 1, name: name },
    ];

    setOperators(nextOperators);
    setName("");
  }

  const handleClickShowForm = (operator: InitialOperators[0]) => {
    setShowPayForm(operator)
  };

  function handleClickShowAddForm() {
    setshowAddForm(!showAddForm);
  }

  return (
    <>
      <ul>
        {operators.map((operator) => (
          <li key={operator.id}>
            <button type="button" onClick={() => handleClickShowForm(operator)}>
              {operator.name}
            </button>
          </li>
        ))}
      </ul>
      {showPayForm && <PayForm showPayForm={showPayForm} />}

      <button type="button" onClick={handleClickShowAddForm}>
        +
      </button>
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
