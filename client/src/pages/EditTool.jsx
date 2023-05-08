// import React from 'react'
import { Table } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../hooks/index.js";
import { useParams } from "react-router-dom";

const EditTool = () => {
  const { id } = useParams(); // get the ID from the URL
  const app = useApp();
  const { isLoading, data } = useQuery(["api/tools", id], () => {
    return app.service("api/tools").get(id);
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Client Name</th>
          <th>Tool Name</th>
          <th>Size</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr key={data._id}>
          <td>{data._id}</td>
          <td>{data.clientName}</td>
          <td>{data.toolName}</td>
          <td>{data.size}</td>
          <td>{data.description}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default EditTool;
