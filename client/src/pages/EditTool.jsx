// import React from 'react'
import { Card, CardBody } from "reactstrap";
import { Formik, Form, FormItem, FormSubmit } from "../components/Form";
// import { useQueryClient } from "@tanstack/react-query";
// import { useApp } from "../hooks/index.js";

const EditTool = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  // const app = useApp();
  // const queryClient = useQueryClient();

  // async function onSubmit(data, formik) {
  //   try {
  //     const result = await app.service("api/tools").create(data);
  //     console.log(result);
  //     queryClient.invalidateQueries(["api/tools"]);
  //     formik.resetForm();
  //   } catch (error) {
  //     console.error(error);
  //     if (error.errors) {
  //       formik.setErrors(error.errors);
  //     }
  //   }
  // }

  return (
    <Card>
      <CardBody>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            search: undefined,
            clientId: undefined,
            name: undefined,
            description: undefined,
            size: undefined,
          }}
        >
          <Form>
            <FormItem name="search" label="Search Tools" />
            <FormSubmit>Search</FormSubmit>
            <FormItem name="clientId" label="Client ID" />
            <FormItem name="name" label="Name" />
            <FormItem
              name="description"
              type="textarea"
              rows="4"
              label="Description"
            />
            <FormItem name="size" type="radio" value="sm" label="Small" />
            <FormItem name="size" type="radio" value="lg" label="Large" />
            <FormItem name="size" type="radio" value="xl" label="Extra Large" />
            <FormSubmit>Update</FormSubmit>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};

export default EditTool;
