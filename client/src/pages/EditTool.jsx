// import React from 'react'
// import { Table } from "reactstrap";
import { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Formik, Form, FormItem, FormSubmit } from "../components/Form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useApp } from "../hooks/index.js";
import { useParams } from "react-router-dom";

const EditTool = () => {
  const { id } = useParams(); // get the ID from the URL
  const app = useApp();
  const { isLoading, data } = useQuery(["api/tools", id], () => {
    return app.service("api/tools").get(id);
  });

  const [clientName, setClientName] = useState(data?.clientName || "");
  const [toolName, setToolName] = useState(data?.toolName || "");
  const [description, setDescription] = useState(data?.description || "");
  const [size, setToolSize] = useState(data?.size || "");

  const { mutate } = useMutation((updatedTool) => {
    return app.service("api/tools").update(id, updatedTool);
  });

  const updateTool = (event) => {
    event.preventDefault();
    mutate({ clientName, toolName, description, size });
  };

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
            <FormItem
              name="clientName"
              label="Client Name"
              onChange={(event) => setClientName(event.target.value)}
            />
            <FormItem
              name="toolName"
              label="Tool Name"
              onChange={(event) => setToolName(event.target.value)}
            />
            <FormItem
              name="description"
              type="textarea"
              rows="4"
              label="Description"
              onChange={(event) => setDescription(event.target.value)}
            />
            <FormItem
              name="size"
              type="radio"
              value="sm"
              label="Small"
              onChange={(event) => setToolSize(event.target.value)}
            />
            <FormItem
              name="size"
              type="radio"
              value="lg"
              label="Large"
              onChange={(event) => setToolSize(event.target.value)}
            />
            <FormItem
              name="size"
              type="radio"
              value="xl"
              label="Extra Large"
              onChange={(event) => setToolSize(event.target.value)}
            />
            <FormSubmit>Update</FormSubmit>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};

export default EditTool;
