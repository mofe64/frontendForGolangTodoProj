import { Typography } from "@mui/material";
import FormikInput from "../components/FormikInput";
import { ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { greenPrimary } from "../store/constant";
import { Formik, Field } from "formik";
import { Box } from "@mui/system";
import { useCallback, useContext } from "react";
import AuthContext from "../store/context";
import { createTaskUrl } from "../api";
import notify from "../hooks/useNotify";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);
  const hasReached1200px = useMediaQuery("(max-width: 1200px)");
  const submit = useCallback(
    async (name, description) => {
      const onLoginSuccess = () => {
        navigate({ pathname: "/" });
      };
      const authToken = auth.token;
      const userId = auth.userId;
      const data = {
        name,
        description,
        creatorId: userId,
      };
      console.log("data", data);
      try {
        const res = await fetch(createTaskUrl, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (res.ok) {
          await res.json();
          notify("Task Created Successfully", false, onLoginSuccess);
        } else {
          const response = await res.json();
          throw Error(response.data.data);
        }
      } catch (err) {
        notify(err.message, true);
        console.log(err);
      }
    },
    [navigate, auth]
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
          Create A New Task
        </Typography>
        <Formik
          initialValues={{ name: "", description: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name field cannot be empty";
            }
            if (!values.description) {
              errors.description = "Description cannot be empty";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await submit(values.name, values.description);
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
                  label="Task Name"
                  id="123asawfa"
                  name="name"
                  type="test"
                  component={FormikInput}
                  value={values.name}
                  hasIcon={false}
                  placeholder="Task Name  Ex. ( Do dishes)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Field
                  label="Description"
                  id="123asaeaq"
                  name="description"
                  type="textt"
                  component={FormikInput}
                  value={values.description}
                  hasIcon={false}
                  placeholder="Enter Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  {!isSubmitting && "Create"}
                </Button>
              </form>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateTask;
