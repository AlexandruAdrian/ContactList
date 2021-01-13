import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// Context
import { AuthContext } from "../../contexts/authContext.jsx";
// Hooks
import { useHistory } from "react-router-dom";
import useToken from "../../hooks/useToken";
// Components
import Nav from "./Nav/Nav.jsx";
import Contacts from "./Contacts/Contacts.jsx";

const Dashboard = () => {
  const history = useHistory();
  const token = useToken();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.name);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        history.replace("/");
      });
  }, []);

  return (
    <main className="container-fluid pt-5 mb-5">
      <Nav user={user} />
      <div className="row">
        <Contacts />
      </div>
    </main>
  );
};

export default Dashboard;
