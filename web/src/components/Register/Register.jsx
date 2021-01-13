import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// Hooks
import useForm from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
// Context
import { AuthContext } from "../../contexts/authContext.jsx";
// Utils
import validateRegister from "../../utils/validateRegister";
// Components
import Success from "./Success.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const { isLoggedIn } = useContext(AuthContext);
  const [registered, setRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const initialState = {
    name: "",
    phone: "",
    password: "",
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.replace("/");
    }
  }, []);

  const { values, errors, handleChange, handleSubmit, handleFocus } = useForm(
    submit,
    validateRegister,
    initialState,
    setResponseError
  );

  function submit() {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/api/users/register", {
        name: values.name,
        phoneNumber: values.phone,
        password: values.password,
      })
      .then((res) => {
        if (res.status === 201) {
          setIsLoading(false);
          setRegistered(true);
        }
      })
      .catch((err) => {
        setResponseError(err.response.data.message);
        setIsLoading(false);
      });
  }

  return registered ? (
    <Success />
  ) : (
    <section className="container-fluid w-100 pt-2">
      <Link to="/">
        <FontAwesomeIcon icon="arrow-left" size="lg" />
      </Link>
      <h1 className="text-center text-primary mt-1">Register</h1>
      <div className="row">
        <form
          className="col-12 col-sm-10 col-md-8 col-lg-5 mt-4 mx-auto"
          noValidate
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              onChange={handleChange}
              onFocus={handleFocus}
              type="text"
              className={`form-control ${errors.name && "border-danger"}`}
              value={values.name}
              id="name"
              placeholder="Enter your name"
            />
            <p className="px-1 text-danger">{errors.name}</p>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              onChange={handleChange}
              onFocus={handleFocus}
              type="text"
              className={`form-control ${errors.phone && "border-danger"}`}
              value={values.phone}
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
            />
            <p className="px-1 text-danger">{errors.phone}</p>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              onFocus={handleFocus}
              type="password"
              className={`form-control ${errors.password && "border-danger"}`}
              value={values.password}
              name="password"
              id="password"
              placeholder="Enter your password"
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
              "Submit"
            )}
          </button>
        </form>
      </div>
      <p className="text-center text-danger mt-3">{responseError}</p>
    </section>
  );
};

export default Register;
