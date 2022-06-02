import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AppTextField from "../../@crema/core/AppFormComponents/AppTextField";
import { ReactComponent as Logo } from "../../assets/user/login.svg";
import { login } from "./LoginAPI";
import { loginSuccess } from "./LoginSlice";
import classes from "./styles.module.scss";
const validationSchema = yup.object({
  email: yup
    .string()
    .email("The Email you entered is not a valid format!")
    .required("Please enter Email Address!"),
  password: yup.string().required("Please enter password!"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [wrongCredentials, setWrongCredential] = useState(false);
  const [notAuth, setNotAuth] = useState(false);

  return (
    <>
      <div className={classes.loginContainer}>
        <motion.div
          animate={{
            scale: [0.5, 1, 1],
            rotate: [180, 0, 0],
            borderRadius: ["50%", "20%", "5%"],
            height: ["150px", "150px", "500px"],
            width: ["150px", "150px", "600px"],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.3, 0.6],
          }}
        >
          <motion.div
            animate={{
              opacity: [0, 1],
            }}
            className={classes.login}
            transition={{
              duration: 1.5,
              times: [0.2, 0.6],
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  maxWidth: 1024,
                  width: "100%",
                  padding: 8,
                  paddingLeft: { xs: 8, md: 2 },
                  overflow: "hidden",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
              >
                <Grid container spacing={5}>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                      "& svg": {
                        width: "100%",
                        height: "100%",
                        display: "inline-block",
                        paddingRight: { xs: 0, lg: 10 },
                      },
                    }}
                  >
                    <Logo fill={"#ffcfd1"} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mb: { xs: 3, xl: 4 },
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#ffcfd1",
                      }}
                    >
                      Kibi Management
                    </Box>
                    <Box
                      sx={{
                        mb: { xs: 3, xl: 4 },
                      }}
                    >
                      {wrongCredentials && (
                        <span style={{ color: "red" }}>
                          The email or password is incorrect
                        </span>
                      )}
                      {notAuth && (
                        <span style={{ color: "red" }}>
                          You don't have this authentication
                        </span>
                      )}
                    </Box>
                    <Formik
                      validateOnChange={true}
                      initialValues={{
                        email: "vuong@kibi.vn",
                        password: "123456",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={async (values) => {
                        login(dispatch, values)
                          .then((res) => {
                            if (res.type === "admin" || res.type === "staff") {
                              dispatch(loginSuccess(res));
                              navigate("/dashboard");
                            } else {
                              setNotAuth(true);
                            }
                          })
                          .catch(() => {
                            setWrongCredential(true);
                          });
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form noValidate autoComplete="off">
                          <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                            <AppTextField
                              placeholder={"Email"}
                              label={"Email"}
                              name="email"
                              variant="outlined"
                              sx={{
                                width: "100%",
                              }}
                            />
                          </Box>
                          <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                            <AppTextField
                              type="password"
                              placeholder={"Password"}
                              label={"Password"}
                              name="password"
                              sx={{
                                width: "100%",
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              mb: { xs: 3, xl: 4 },
                              display: "flex",
                              flexDirection: { xs: "column", sm: "row" },
                              alignItems: { sm: "center" },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                sx={{
                                  ml: -3,
                                }}
                              >
                                <Checkbox />
                              </Box>
                              <Box
                                component="span"
                                sx={{
                                  fontSize: 14,
                                }}
                              >
                                Remember me
                              </Box>
                            </Box>
                            <Box
                              component="span"
                              sx={{
                                cursor: "pointer",
                                ml: { xs: 0, sm: "auto" },
                                mt: { xs: 2, sm: 0 },
                                color: "primary.main",
                                fontSize: 14,
                              }}
                            >
                              Forgot password
                            </Box>
                          </Box>
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                            sx={{
                              width: "100%",
                              height: 44,
                              background: "#ffe1bc",
                              fontWeight: 700,
                            }}
                          >
                            Login
                          </Button>
                        </Form>
                      )}
                    </Formik>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
