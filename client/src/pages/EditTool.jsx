// import React from 'react'
import { Card, CardBody } from "reactstrap";
import { Formik, Form, FormItem, FormSubmit } from "../components/Form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApp } from "../hooks/index.js";
import { useParams } from "react-router-dom";

const EditTool = () => {
  const { id } = useParams(); // get the ID from the URL
  const app = useApp();
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery(["api/tools", id], () => {
    return app.service("api/tools").get(id);
  });

  async function updateTool(tool, formik) {
    try {
      const result = await app.service("api/tools").update(tool);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardBody>
        <Formik
          onSubmit={updateTool}
          initialValues={{
            clientName: `${data.clientName}`,
            toolName: `${data.toolName}`,
            description: `${data.description}`,
            size: `${data.size}`,
          }}
        >
          <Form>
            <FormItem name="_id" label="Tool ID" value={data._id} />
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
            <FormSubmit>Update</FormSubmit>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};

export default EditTool;
