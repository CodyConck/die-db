// import React from 'react'
import { FormItem, Formik, Form, FormSubmit } from "../components/Form.jsx";
import { Card, CardBody } from "reactstrap";

import "../styles/theme.scss";

const Home = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Card>
      <CardBody>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            employeeID: "",
          }}
        >
          <Form>
            <FormItem name="employeeID" type="id" label="Employee ID" />
            <FormSubmit>Submit</FormSubmit>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};

export default Home;
