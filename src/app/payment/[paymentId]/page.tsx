"use client";
import { useContext } from "react";
import InputMask from "react-input-mask";
import { useFormik } from "formik";
import { styled, keyframes } from "styled-components";
import Link from "next/link";
import { validationSchemaPayment } from "@/app/schemas";
import { ContextOperators } from "@/app/layout";

const download = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const PaymentWrapper = styled.div`
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
  animation: ${download} 0.3s linear;
`;

const PaymentContainer = styled.div`
  position: relative;
  margin: 50px 0 0;
  max-width: 500px;
  width: 100%;
  padding: 45px;
  border-radius: 10px;
  background-color: #ffffff;
`;

const Title = styled.h1`
  margin: 0 0 20px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  text-align: center;
  color: #2c6a66;
`;

const Text = styled.p`
  margin: 10px 0 0;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  text-align: left;
  color: #000000;
`;

const BoldText = styled.strong`
  margin: 0 0 0 10px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  text-align: left;
  color: #eb5d54;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 15px 0 0;
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

const DEFAULT_STATE_FORM = {
  phoneNumber: "",
  totalAmount: "",
};

function getRandomArbitrary(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function PaymentDetail(props: { params: { paymentId: string } }) {
  const {
    params: { paymentId },
  } = props;

  const { getOperator } = useContext(ContextOperators);
  const operatorById = getOperator ? getOperator(Number(paymentId)) : null;

  const formik = useFormik({
    initialValues: DEFAULT_STATE_FORM,
    validationSchema: validationSchemaPayment,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      return new Promise(function (resolve, reject) {
        if (getRandomArbitrary(200, 400) > 300) {
          setTimeout(() => {
            resolve(alert(JSON.stringify(values, null, 2)));
          }, 1000);
        } else {
          setTimeout(() => {
            reject(alert("Ошибка, попробуйте еще раз"));
          }, 1000);
        }
      }).catch(() => console.log("Ошибка"));
    },
  });
  return (
    <PaymentWrapper>
      <PaymentContainer>
        <CloseButton>
          <Link href={"/"}>
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
        <Title>Signup</Title>
        <Text>
          Выбранный оператор:<BoldText>{operatorById?.name}</BoldText>
        </Text>
        <Form onSubmit={formik.handleSubmit}>
          <LabelInput htmlFor="phoneNumber">Номер телефона</LabelInput>
          <InputMask
            mask="+7(999)999-99-99"
            placeholder="+7(999)999-99-99"
            id="phoneNumber"
            name="phoneNumber"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />
          {formik.errors.phoneNumber ? (
            <ErrorText>{formik.errors.phoneNumber}</ErrorText>
          ) : null}
          <LabelInput htmlFor="totalAmount">Сумма (Р)</LabelInput>
          <input
            id="totalAmount"
            name="totalAmount"
            placeholder="100"
            onChange={formik.handleChange}
            value={formik.values.totalAmount}
          />
          {formik.errors.totalAmount ? (
            <ErrorText>{formik.errors.totalAmount}</ErrorText>
          ) : null}
          <SubmitButton type="submit">Оплатить</SubmitButton>
        </Form>
      </PaymentContainer>
    </PaymentWrapper>
  );
}

export default PaymentDetail;
