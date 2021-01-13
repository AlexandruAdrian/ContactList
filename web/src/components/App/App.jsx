import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckCircle,
  faArrowLeft,
  faSpinner,
  faUser,
  faTrashAlt,
  faPencilAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
// Styles
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
// Components
import Footer from "../Footer/Footer.jsx";
import Landing from "../Landing/Landing.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
// Contexts
import { AuthContextProvider } from "../../contexts/authContext.jsx";

library.add(
  fab,
  faCheckCircle,
  faArrowLeft,
  faSpinner,
  faUser,
  faTrashAlt,
  faPencilAlt,
  faPlus
);

const App = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" exact component={Landing} />
      </Switch>
    </AuthContextProvider>
    <Footer />
  </BrowserRouter>
);

export default App;
