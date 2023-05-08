// import React from "react";
import { Table } from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import { useApp } from "../hooks/index.js";
import { Link } from "react-router-dom";

function ToolsList() {
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
          <th>Client Name</th>
          <th>Tool Name</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((result) => {
          return (
            //link when clicked will take you to specific tools info for editing based off of _id
            <tr key={result._id}>
              <Link to={`/edittools/${result._id}`}>
                <td>{result._id}</td>
              </Link>
              <td>{result.clientName}</td>
              <td>{result.toolName}</td>
              <td>{result.size}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ToolsList;
