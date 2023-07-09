import { useState } from "react";
import { initialOperators } from "../data/data";
import PayForm from "./paymentForm";
import { styled } from "styled-components";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";

type InitialOperators = typeof initialOperators;

const List = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  flex: 1;
  margin: 15px;
`;

const LightButton = styled.button`
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

const AddButton = styled.button`
  margin: 15px 0 0 15px;
  padding: 15px 30px;
  box-shadow: 0 15px 30px 0 rgba(20, 27, 36, 0.1);
  border-radius: 10px;
  border: 1px solid transparent;
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

const AddOperatorWrapper = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
`;

const AddOperatorContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 50px 0 0;
  max-width: 500px;
  width; 100%;
  padding: 45px;
  border-radius: 10px;
  background-color: #ffffff;
  `;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    border: 1px solid #eb5d54;
    outline: none;
  }
`;

const LabelInput = styled.label`
  margin: 15px 0 5px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  text-align: left;
  color: #000000;
`;

const ErrorText = styled.p`
  margin: 5px 0 0;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  text-align: left;
  color: #eb5d54;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 15px 0 0;
`;

const SubmitButton = styled.button`
  margin: 15px 0 0;
  width: 100%;
  padding: 12px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  background-color: #2c6a66;
  border: 1px solid #2c6a66;
  color: #ffffff;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5fdec;
    border-color: #f5fdec;
    color: #000000;
  }

  &:focus {
    border-color: #eb5d54;
    outline: none;
  }
`;

const DEFAULT_STATE_FORM = {
  anotherOperator: "",
};

const validationSchema = Yup.object().shape({
  anotherOperator: Yup.string()
    .min(1, "Введите минимум 1 символ")
    .required("Поле не заполнено"),
});

const ListOperators = () => {
  const [name, setName] = useState("");
  const [showPayForm, setShowPayForm] = useState<InitialOperators[0] | null>(
    null
  );
  const [showAddForm, setshowAddForm] = useState(false);
  const [operators, setOperators] = useState(initialOperators);

  function handleClickAddOperator(value:string) {
    const nextOperators = [
      ...operators,
      {
        id: operators[operators.length - 1].id + 1,
        name: value,
        img: "/logo-sim.png",
      },
    ];

    setOperators(nextOperators);
    setName("");
  }

  const handleClickShowForm = (operator: InitialOperators[0]) => {
    setShowPayForm(operator);
  };

  const closeModal = () => {
    setShowPayForm(null);
  };

  function handleClickShowAddForm() {
    setshowAddForm(!showAddForm);
  }

  const formik = useFormik({
    initialValues: DEFAULT_STATE_FORM,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      handleClickAddOperator(values.anotherOperator);
    },
  });

  return (
    <>
      <List>
        {operators.map((operator) => (
          <ListItem key={operator.id}>
            <LightButton onClick={() => handleClickShowForm(operator)}>
              <Image
                src={operator.img}
                width={40}
                height={40}
                alt={"Operator-" + operator.name}
                priority={true}
              />
              <Subtitle>{operator.name}</Subtitle>
            </LightButton>
          </ListItem>
        ))}
      </List>
      {showPayForm && (
        <PayForm showPayForm={showPayForm} closeModal={closeModal} />
      )}

      <AddButton type="button" onClick={handleClickShowAddForm}>
        Другой оператор +
      </AddButton>
      {showAddForm && (
        <AddOperatorWrapper>
          <AddOperatorContainer>
            <CloseButton type="button" onClick={handleClickShowAddForm}>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.92319 4.85736L4.00012 5.78043L9.07703 10.8573L4 15.9343L4.92307 16.8574L10.0001 11.7804L15.0769 16.8572L16 15.9341L10.9232 10.8573L15.9999 5.78064L15.0768 4.85757L10.0001 9.93425L4.92319 4.85736Z"
                  fill="#000000"
                />
              </svg>
            </CloseButton>
            <Form onSubmit={formik.handleSubmit}>
              <LabelInput htmlFor="anotherOperator">Другой оператор</LabelInput>
              <input
                id="anotherOperator"
                name="anotherOperator"
                type="text"
                value={formik.values.anotherOperator}
                onChange={formik.handleChange}
              />
              {formik.errors.anotherOperator ? (
                <ErrorText>{formik.errors.anotherOperator}</ErrorText>
              ) : null}
              <SubmitButton type="submit">Add</SubmitButton>
            </Form>
          </AddOperatorContainer>
        </AddOperatorWrapper>
      )}
    </>
  );
};

export default ListOperators;
