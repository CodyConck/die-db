// import React from 'react'
import { FormItem, Formik, Form, FormSubmit } from "../components/Form.jsx";
// import { useApp } from "../hooks/index.js";
// import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";

import "../styles/theme.scss";

const SignIn = () => {
  // const app = useApp();
  // const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Formik
      onSubmit={formik.handleSubmit}
      onChange={(e) =>
        setName(e.target.value) &&
        setEmail(e.target.value) &&
        setPassword(e.target.value)
      }
      initialValues={{
        name: { name },
        email: { email },
        password: { password },
      }}
    >
      <Form>
        <FormItem name="name" label="Name" />
        <FormItem name="email" label="Email" />
        <FormItem name="password" label="Password" />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    </Formik>
  );
};

export default SignIn;
