import * as Yup from "yup";

export const LoginSchema = Yup.object({
  userName: Yup.string().required("username is required"),
  password: Yup.string().required("Password is required"),
});