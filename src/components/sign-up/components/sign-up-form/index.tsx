"use client";
import { Formik } from "formik";
import { SignUpFields } from "../../sign-up/types";

import { Box, Button, Typography } from "@mui/material";
import { Alert, TextField } from "./style";

import styles from "../../../../styles/Home.module.css";
import signUpFormValidation from "@/components/sign-up/validations";
import useNotification from "@/components/common/notifications/context/useNotification";
import axios from "axios";

const SignUpForm = () => {
  const { isEnabled, message, type, setNotification } = useNotification();

  return (
    <>
      <Box className={styles.cardBg}>
        <Typography
          className={styles.heading}
          component="h3"
          variant="h4"
          align="center"
          gutterBottom
        >
          Sign Up
        </Typography>
        <Formik
          initialValues={
            {
              username: "",
              email: "",
              password: "",
            } as SignUpFields
          }
          validationSchema={signUpFormValidation}
          onSubmit={async (values: SignUpFields) => {
            try {
              const response = await axios.post("api/auth/register", values);
              setNotification(true, response.data.data.message, "success");
              console.log(response.data.data.message);
            } catch (error) {
              setNotification(
                true,
                JSON.parse(error.response.data.error).message,
                "error"
              );
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                className={styles.textFields}
                type="username"
                name="username"
                value={values.username}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                label="Username"
              />
              <TextField
                className={styles.textFields}
                type="email"
                name="email"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                label="Email"
              />
              <TextField
                className={styles.textFields}
                type="password"
                name="password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                label="Password"
                my={2}
              />

              {isEnabled && (
                <Alert mt={2} mb={3} severity={type}>
                  {message}
                </Alert>
              )}

              <Button
                sx={{ marginTop: 3 }}
                variant="contained"
                type="submit"
                size="large"
                className={styles.submitbtn}
                style={{
                  backgroundColor: "#FF3841",
                }}
                fullWidth
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default SignUpForm;
