import app from "./feathers/app";
import { AppProvider, AppStateProvider } from "./components/Provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/theme.scss";

import { Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import EditTool from "./pages/EditTool";
import NewTools from "./pages/NewTools";
import ToolsList from "./pages/ToolsList";
import Nav from "./components/Navbar";

const queryClient = new QueryClient();

function Page() {
  return (
    <Container>
      <Nav />
      <div className="mb-4"></div>
    </Container>
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
                <Route path="edittools/:id" element={<EditTool />} />
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
