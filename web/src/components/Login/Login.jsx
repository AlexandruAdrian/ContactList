import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// Hooks
import useForm from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
// Context
import { AuthContext } from "../../contexts/authContext.jsx";
// Utils
import validateLogin from "../../utils/validateLogin";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const [responseError, setResponseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    phone: "",
    password: "",
  };

  const { values, errors, handleChange, handleSubmit, handleFocus } = useForm(
    submit,
    validateLogin,
    initialState,
    setResponseError
  );

  useEffect(() => {
    if (isLoggedIn) {
      history.replace("/dashboard");
    }
  }, []);

  function submit() {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/api/users/login", {
        phoneNumber: values.phone,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data);
        setIsLoading(false);
        setIsLoggedIn(true);
        history.replace("/");
      })
      .catch((err) => {
        setResponseError(err.response.data.message);
        setIsLoading(false);
      });
  }

  return (
    <section className="container-fluid pt-2">
      <Link to="/">
        <FontAwesomeIcon icon="arrow-left" size="lg" />
      </Link>
      <h1 className="text-center text-primary mt-5">Login</h1>
      <div className="row">
        <form
          className="col-12 col-sm-5 col-md-4 col-lg-3 mt-5 mx-auto"
          noValidate
        >
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              onChange={handleChange}
              onFocus={handleFocus}
              id="phoneNumber"
              name="phone"
              type="text"
              className={`form-control ${errors.phone && "border-danger"}`}
              placeholder="Enter phone number"
              value={values.phone}
            />
            <p className="px-1 text-danger">{errors.phone}</p>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Password</label>
            <input
              onChange={handleChange}
              onFocus={handleFocus}
              id="login-password"
              name="password"
              type="password"
              className={`form-control ${errors.password && "border-danger"}`}
              placeholder="Enter password"
              value={values.password}
            />
            <p className="px-1 text-danger">{errors.password}</p>
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-primary align-self-center w-100 mt-3"
          >
            {isLoading ? (
              <FontAwesomeIcon icon="spinner" className="fa-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
      <p className="text-center text-danger mt-3">{responseError}</p>
    </section>
  );
};

export default Login;
