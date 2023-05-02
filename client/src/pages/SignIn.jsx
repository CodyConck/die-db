// import React from 'react'
import { FormItem, Formik, Form, FormSubmit } from "../components/Form.jsx";
import { Card, CardBody } from "reactstrap";

import "../styles/theme.scss";

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Card>
      <CardBody>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
        >
          <Form>
            <FormItem name="name" label="Name" />
            <FormItem name="email" label="Email" />
            <FormItem name="password" type="password" label="Password" />
            <FormSubmit>Submit</FormSubmit>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};

export default SignIn;
