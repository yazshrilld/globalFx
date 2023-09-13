import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { providusLoginFn } from "utils/Api/auth";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "utils/Yup/YupSchema";
import { useSessionStorage } from "Hooks/useSessionStorage";
import { useState, useEffect } from "react";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import { ReactComponent as EyeClosedIcon } from "assets/svg/eye-closed.svg";
import InputFormField from "components/InputFormFIeld/InputFormField";
import BaseButton from "components/BaseButton/BaseButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SignIn = () => {
  const navigate = useNavigate();
  const { setSessionStorage } = useSessionStorage();
  const [showPassword, setShowPassword] = useState(false);
  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: "success",
    message: "",
  })

  const STAFF_ROLE = [
    "Application Developer",
    "Customer Service Officer",
    "Legal Officer",
    "Team Lead, Legal Services",
  ];

  const handleSubmit = () => {
    
  }

  const handleShowPasswordVisibility = () => {
    setShowPassword((prevS) => !prevS);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: "",
    validationSchema: "",
  })

  return (
    <>
      <p className="text-3xl mb-1 font-bold">Login</p>
      <p className="text-[#C2C2C2] text-sm mb-6">
        Enter your valid login credentials
      </p>
      <form className="space-y-7">
        <InputFormField
          label="Username"
          placeholder="Username"
          name="userName"
          value={formik.values.userName}
          type="text"
          onChange={formik.handleChange}
          touched={formik.touched.userName}
          error={formik.errors.userName}
        />

        <InputFormField
          label="Password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          type={showPassword ? "text" : "password"}
          onChange={formik.handleChange}
          touched={formik.touched.password}
          error={formik.errors.password}
          appendIcon={
            showPassword ? (
              <EyeOpenIcon
                className="absolute right-2 cursor-pointer w-5 h-5 select-none"
                onClick={handleShowPasswordVisibility}
              />
            ) : (
              <EyeClosedIcon
                className="absolute right-2 cursor-pointer w-5 h-5 select-none"
                onClick={handleShowPasswordVisibility}
              />
            )
          }
        />

        

        <BaseButton
          type="submit"
          // isLoading={PIsLoading || SIsLoading}
          isLoading={false}
          customStyle="w-full "
        >
          Login
        </BaseButton>
      </form>
    </>
  );
};

export default SignIn;
