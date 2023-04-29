import app from "./feathers/app";
import { AppProvider, AppStateProvider } from "./components/Provider";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "./styles/theme.scss";
import { useApp } from "./hooks";
import { Card, CardBody, Container, Table } from "reactstrap";
import { FormItem, Formik, Form, FormSubmit } from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import EditTool from "./pages/EditTool";
import NewTools from "./pages/NewTools";
import ToolsList from "./pages/ToolsList";
import Navigation from "./components/Navbar";

const queryClient = new QueryClient();

function Page() {
  return (
    <Container>
      <Navigation />
      <div className="mb-4">
        <NewTool />
      </div>
      <ToolsTable />
    </Container>
  );
}

function NewTool() {
  const app = useApp();
  const queryClient = useQueryClient();

  async function onSubmit(data, formik) {
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
            clientId: undefined,
            name: undefined,
            description: undefined,
            size: undefined,
          }}
        >
          <Form>
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
            <FormSubmit>Submit</FormSubmit>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}

function ToolsTable() {
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
}

function App() {
  return (
    <>
      <AppProvider app={app}>
        <AppStateProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Page />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="edittool" element={<EditTool />} />
                <Route path="newtool" element={<NewTools />} />
                <Route path="toolslist" element={<ToolsList />} />
              </Routes>
            </Router>
          </QueryClientProvider>
        </AppStateProvider>
      </AppProvider>
    </>
  );
}

export default App;
