import { Typography } from "@mui/material";
import FormikInput from "../components/FormikInput";
import { ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import lock from "../assets/lock.svg";
import email from "../assets/sms-notification.svg";
import { greenPrimary } from "../store/constant";
import { Formik, Field } from "formik";
import validator from "validator";
import { Box } from "@mui/system";
import { useCallback, useContext } from "react";
import AuthContext from "../store/context";
import { loginUrl } from "../api";
import notify from "../hooks/useNotify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { setAuth } = useContext(AuthContext);
  const hasReached1200px = useMediaQuery("(max-width: 1200px)");
  const submit = useCallback(
    async (email, password) => {
      const onLoginSuccess = () => {
        navigate({ pathname: "/" });
      };
      const credentails = {
        email,
        password,
      };
      try {
        const requestOptions = {
          method: "POST",
          body: JSON.stringify(credentails),
          headers: {
            "content-type": "application/json",
          },
        };
        const res = await fetch(loginUrl, requestOptions);
        if (res.ok) {
          const response = await res.json();

          const token = response.data.token;

          const authObj = {
            userId: response.data.user.id,
            token,
            email: response.data.user.email,
            name: response.data.user.name,
          };
          setAuth(authObj);
          window.sessionStorage.setItem("auth", JSON.stringify(authObj));
          let name = response.data.user.name;
          if (!name) {
            name = "";
          }
          notify(`Welcome ${name}`, false, onLoginSuccess);
        } else {
          const response = await res.json();
          throw Error(response.data.data);
        }
      } catch (err) {
        notify(err.message, true);
        console.log(err);
      }
    },
    [navigate, setAuth]
  );
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          width: !hasReached1200px ? "50%" : "80%",
        }}
      >
        <Typography mb="1rem" sx={{ fontWeight: "700", fontSize: "27px" }}>
          Welcome
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email field cannot be empty";
            } else if (!validator.isEmail(values.email)) {
              errors.email = "Please enter a valid email";
            }
            if (!values.password) {
              errors.password = "Password cannot be empty";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await submit(values.email, values.password);
            setSubmitting(false);
          }}
        >
          {({
            isValid,
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <Field
                  label="Email Address"
                  id="123asawfa"
                  name="email"
                  type="email"
                  component={FormikInput}
                  value={values.email}
                  iconSource={email}
                  placeholder="Email Address  Ex. ( test@example.com )"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  label="Password"
                  id="123asaeaq"
                  name="password"
                  type="password"
                  component={FormikInput}
                  value={values.password}
                  iconSource={lock}
                  placeholder="Enter Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isPassword
                />
                <Button
                  disabled={!isValid}
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: greenPrimary,
                    width: "100%",
                    marginTop: "2rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    "&:hover": { backgroundColor: greenPrimary },
                  }}
                >
                  {isSubmitting && (
                    <Loader
                      type="TailSpin"
                      color="#FFF"
                      height={20}
                      width={20}
                    />
                  )}
                  {!isSubmitting && "Log in"}
                </Button>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
