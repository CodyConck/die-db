// import React from 'react'
import { Card, CardBody } from "reactstrap";
import { Formik, Form, FormItem, FormSubmit } from "../components/Form";
import { useQueryClient } from "@tanstack/react-query";
import { useApp } from "../hooks/index.js";

function NewTool() {
  const app = useApp();
  const queryClient = useQueryClient();

  async function onSubmit(data, formik) {
    // console.log(data);
    try {
      const result = await app.service("api/tools").create(data);
      console.log(result);
      queryClient.invalidateQueries(["api/tools"]);
      formik.resetForm();
    } catch (error) {
      console.error(error);
      if (error.errors) {
        formik.setErrors(error.errors);
      }
    }
  }

  return (
    <Card>
      <CardBody>
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            clientName: undefined,
            toolName: undefined,
            description: undefined,
            size: undefined,
          }}
        >
          <Form>
            <FormItem name="clientName" label="Client Name" />
            <FormItem name="toolName" label="Tool Name" />
            <FormItem
              name="description"
              type="textarea"
              rows="4"
              label="Description"
            />
            <FormItem name="size" type="radio" value="sm" label="Small" />
            <FormItem name="size" type="radio" value="lg" label="Large" />
            <FormItem name="size" type="radio" value="xl" label="Extra Large" />
            <FormSubmit>Submit</FormSubmit>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}

export default NewTool;
