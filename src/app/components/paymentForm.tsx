import { useFormik } from "formik";
import InputMask from "react-input-mask";

import * as Yup from "yup";


type Props = {
  showPayForm: {
    id: number;
    name: string;
  };
};

const DEFAULT_STATE_FORM = {
  phoneNumber: "",
  totalAmount: "",
};

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string().test(
    "is-number",
    "is not phone number",
    (value) => value?.match(/[0-9]/g)?.length === 11
  ),
  totalAmount: Yup.string()
    .min(1, "Too Short!")
    .max(4, "Too Long!")
    .required("Required"),
});

const PaymentForm = (props: Props) => {
  const formik = useFormik({
    initialValues: DEFAULT_STATE_FORM,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 500);
    },
  });
  return (
    <div>
      <h1>Signup</h1>
      <strong>{props.showPayForm.name}</strong>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="phoneNumber">First Name</label>
        <InputMask
          mask="+7(999)999-99-99"
          name="phoneNumber"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
        />
        {formik.errors.phoneNumber ? (
          <div>{formik.errors.phoneNumber}</div>
        ) : null}
        <label htmlFor="totalAmount">Last Name</label>
        <input
          id="totalAmount"
          name="totalAmount"
          placeholder="100"
          onChange={formik.handleChange}
          value={formik.values.totalAmount}
        />
        {formik.errors.totalAmount ? (
          <div>{formik.errors.totalAmount}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PaymentForm;
