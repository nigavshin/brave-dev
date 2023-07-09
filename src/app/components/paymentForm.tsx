import { useFormik } from "formik";
import InputMask from "react-input-mask";
import * as Yup from "yup";
import { styled } from "styled-components";

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

  @media (max-width: 414px) {
    height: 150%;
  }
`;

const PaymentContainer = styled.div`
position: relative;
margin: 50px 0 0;
max-width: 500px;
width; 100%;
padding: 45px;
border-radius: 10px;
background-color: #ffffff;
`;

const Title = styled.h1`
  margin: 0 0 20px;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%;
  text-align: center;
  color: #2c6a66;
`;

const Text = styled.p`
  margin: 10px 0 0;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  text-align: left;
  color: #000000;
`;

const BoldText = styled.strong`
  margin: 0 0 0 10px;
  font-family: "Inter", sans-serif;
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

const SubmitButton = styled.button`
  margin: 35px 0 0;
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

type Props = {
  showPayForm: {
    id: number;
    name: string;
  };
  closeModal: () => void;
};

const DEFAULT_STATE_FORM = {
  phoneNumber: "",
  totalAmount: "",
};

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().test(
    "Верно",
    "Неправильный номер",
    (value) => value?.match(/[0-9]/g)?.length === 11
  ),
  totalAmount: Yup.string()
    .min(1, "Слишком мало!")
    .max(3, "Слишком много!")
    .required("Поле не заполнено"),
});

function getRandomArbitrary(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const PaymentForm = (props: Props) => {
  const formik = useFormik({
    initialValues: DEFAULT_STATE_FORM,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        if (getRandomArbitrary(200, 400) < 300) {
          alert("Произошла ошибка, попробуйте еще раз");
          props.closeModal();
        } else {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          props.closeModal();
        }
      }, 500);
      getRandomArbitrary(200, 400);
    },
  });
  return (
    <PaymentWrapper>
      <PaymentContainer>
        <CloseButton type="button" onClick={props.closeModal}>
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.92319 4.85736L4.00012 5.78043L9.07703 10.8573L4 15.9343L4.92307 16.8574L10.0001 11.7804L15.0769 16.8572L16 15.9341L10.9232 10.8573L15.9999 5.78064L15.0768 4.85757L10.0001 9.93425L4.92319 4.85736Z"
              fill="#000000"
            />
          </svg>
        </CloseButton>
        <Title>Signup</Title>
        <Text>
          Выбранный оператор:<BoldText>{props.showPayForm.name}</BoldText>
        </Text>
        <Form onSubmit={formik.handleSubmit}>
          <LabelInput htmlFor="phoneNumber">Номер телефона</LabelInput>
          <InputMask
            mask="+7(999)999-99-99"
            placeholder="+7(999)999-99-99"
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
};

export default PaymentForm;
