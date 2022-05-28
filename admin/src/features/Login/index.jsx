import { Checkbox, Input } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import React from "react";
import classes from "./styles.module.scss";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("The Email you entered is not a valid format!")
    .required("Please enter Email Address!"),
  password: yup.string().required("Please enter password!"),
});
const Login = () => {
  return (
    <div className={classes.loginContainer}>
      <motion.div
        animate={{
          scale: [0.5, 1, 1],
          rotate: [180, 0, 0],
          borderRadius: ["50%", "20%", "5%"],
          height: ["150px", "150px", "400px"],
          width: ["150px", "150px", "350px"],
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
            times: [0.5, 1],
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
                  akjsdksajh
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
                    }}
                  ></Box>

                  <Formik
                    validateOnChange={true}
                    initialValues={{
                      email: "admin@exnodes.vn",
                      password: "dev1234!@#",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(data, { setSubmitting }) => {
                      setSubmitting(true);
                      setSubmitting(false);
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form noValidate autoComplete="off">
                        <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                          <Input
                            name="email"
                            variant="outlined"
                            sx={{
                              width: "100%",
                            }}
                          />
                        </Box>

                        <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                          <Input
                            type="password"
                            name="password"
                            variant="outlined"
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
                            ></Box>
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
                          ></Box>
                        </Box>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                          sx={{
                            width: "100%",
                            height: 44,
                          }}
                        ></Button>
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
  );
};

export default Login;
