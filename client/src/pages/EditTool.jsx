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
          <th>Client ID</th>
          <th>Name</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr key={data._id}>
          <td>{data._id}</td>
          <td>{data.clientId}</td>
          <td>{data.name}</td>
          <td>{data.size}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default EditTool;
