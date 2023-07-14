import * as Yup from "yup";

export const validationSchemaPayment = Yup.object().shape({
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

export const validationSchemaAdd = Yup.object().shape({
    anotherOperator: Yup.string()
      .min(1, "Введите минимум 1 символ")
      .required("Поле не заполнено"),
  });