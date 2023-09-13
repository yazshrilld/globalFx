import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { ReactComponent as EyeOpenIcon } from "assets/svg/eye-open.svg";
import { ReactComponent as EyeClosedIcon } from "assets/svg/eye-closed.svg";
import InputFormField from "components/InputFormFIeld/InputFormField";
import BaseButton from "components/BaseButton/BaseButton";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

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
