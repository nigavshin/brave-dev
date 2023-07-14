"use client";

import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { ContextOperators } from "@/app/layout";
import { validationSchemaAdd } from "../schemas";
import { styled, keyframes } from "styled-components";
import Link from "next/link";

const download = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 15px 0 0;
  width: 100%;
  animation: ${download} 0.3s linear;
`;

const LabelInput = styled.label`
  margin: 15px 0 5px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  text-align: left;
  color: #000000;
`;

const ErrorText = styled.p`
  margin: 5px 0 0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  text-align: left;
  color: #eb5d54;
`;

const SubmitButton = styled.button`
  margin: 35px 0 0;
  width: 100%;
  padding: 12px;
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

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    border: 1px solid #eb5d54;
    outline: none;
  }
`;

const AddOperatorWrapper = styled.div`
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
  width: 100%;
  padding: 45px;
  border-radius: 10px;
  background-color: #ffffff;
`;

const DEFAULT_STATE_FORM = {
  anotherOperator: "",
};

const Page = () => {
  const { addOperator } = useContext(ContextOperators);
  const router = useRouter();
  const formik = useFormik({
    initialValues: DEFAULT_STATE_FORM,
    validationSchema: validationSchemaAdd,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      if (addOperator) {
        addOperator(values.anotherOperator);
        router.push("/");
      }
    },
  });

  return (
    <AddOperatorWrapper>
      <AddOperatorContainer>
        <CloseButton>
          <Link href="/">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.92319 4.85736L4.00012 5.78043L9.07703 10.8573L4 15.9343L4.92307 16.8574L10.0001 11.7804L15.0769 16.8572L16 15.9341L10.9232 10.8573L15.9999 5.78064L15.0768 4.85757L10.0001 9.93425L4.92319 4.85736Z"
                fill="#000000"
              />
            </svg>
          </Link>
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
          <SubmitButton type="submit">Добавить</SubmitButton>
        </Form>
      </AddOperatorContainer>
    </AddOperatorWrapper>
  );
};

export default Page;
