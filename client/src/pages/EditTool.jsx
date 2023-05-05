// import React from 'react'
import { Table } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../hooks/index.js";

const EditTool = () => {
  const app = useApp();
  const { isLoading, data } = useQuery(["api/tools"], () => {
    return app.service("api/tools").find({ query: { $limit: 50 } });
  });
  if (isLoading) {
    return null;
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
        {data.data.map((result) => {
          return (
            <tr key={result._id}>
              <th scope="row">{result._id}</th>
              <td>{result.clientId}</td>
              <td>{result.name}</td>
              <td>{result.size}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default EditTool;
