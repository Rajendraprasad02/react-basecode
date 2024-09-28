import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Card } from "primereact/card";
import Button from "../../components/button/Button";
import TextInput from "../../components/form/text/TextInput";
import CustomPassword from "../../components/form/password/CustomPassword";
import { useForm } from "react-hook-form";
import { isEmailValid } from "../../utils/helper";
import {
  loginDataFetch,
  addLogindetails,
  selectLoggedUser,
  selectUserData,
} from "../login/loginSlice";
import { Toast } from "primereact/toast";
import { protectedCall } from "../../services/userService";

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const dispatch = useDispatch();
  const loggedUser = useSelector(selectLoggedUser);
  const userData = useSelector(selectUserData);

  useEffect(() => {
    dispatch(loginDataFetch({ useMock: true, protectedCall }));
  });

  useEffect(() => {
    if (Object.keys(loggedUser).length) {
      navigate("/dashboard");
    }
  }, [loggedUser, navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const onSubmit = async (data) => {
    try {
      const newData = userData.find(
        (mock) =>
          mock?.email === data?.email && mock?.password === data?.password
      );

      if (Object.keys(newData).length) {
        Object.keys(newData).length;

        dispatch(addLogindetails(newData));
        if (newData?.role === "admin") navigate("/dashboard");
        else if (newData?.role === "department_user")
          navigate("/products_list");
        else if (newData?.role === "demo") navigate("/organization_demo");
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Invalid email or password",
        });
      }
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Login failed",
      });
    }
  };

  const onError = (errors) => {
    Object.values(errors).forEach((error) => {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.message,
      });
    });
  };

  return (
    <div className={styles.outerContainer}>
      <Toast ref={toast} />
      <div className={styles.loginContainer}>
        <Card className={styles.formCard}>
          <div className={styles.logoContainer}>
            <h1></h1>
          </div>
          <h2>Sign in</h2>
          <p>Welcome back! Please enter your details</p>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={styles.inputContainer}>
              <TextInput
                id="email"
                name="email"
                placeholder="Email Address"
                register={register}
                required="Email is required"
                validation={(e) => isEmailValid(e) || "Email is invalid"}
                className={styles.inputField}
                labelText="Email"
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <CustomPassword
                id="password"
                name="password"
                placeholder="Password"
                register={register}
                required="Password is required"
                validation={(e) => e.length > 7 || "Password is invalid"}
                className={styles.inputField}
                labelText="Password"
              />
              {errors.password && (
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
            <div className={styles.forgotPassword}>
              <a href="#" onClick={handleForgotPasswordClick}>
                Forgot your password?
              </a>
            </div>
            <Button
              type="submit"
              className={styles.signInButton}
              name="Sign in"
            />
          </form>
          <div className={styles.signUpText}>
            <p>
              Don&apos;t have an account?
              <a href="#" onClick={handleSignUpClick}>
                Sign up
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
