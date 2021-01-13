import React, { useState, useRef } from "react";
import axios from "axios";
// Hooks
import useForm from "../../../hooks/useForm";
import useToken from "../../../hooks/useToken";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Utils
import validateModalForm from "../../../utils/validateModalForm";
// Styles
import "./FormModal.css";

const FormModal = ({ handleForm, contacts, setContacts }) => {
  const nameRef = useRef();
  const [responseError, setResponseError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    name: "",
    phone: "",
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleFocus,
    resetValues,
  } = useForm(submit, validateModalForm, initialState, setResponseError);

  function submit() {
    const token = useToken();
    axios
      .post(
        "http://localhost:3000/api/contacts/",
        {
          name: values.name,
          phoneNumber: values.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          setIsLoading(true);
          setContacts([res.data, ...contacts]);
          setIsLoading(false);
          resetValues();
          nameRef.current.focus();
        }
      })
      .catch((err) => {
        if (err.response) {
          setResponseError(err.response.data.message);
        }
      });
  }

  return (
    <div className="add-modal-overlay w-100 h-100">
      <form noValidate className="bg-white mx-auto rounded py-4 px-3">
        <div className="close rounded-circle" onClick={handleForm}>
          &times;
        </div>
        <div className="form-group">
          <label htmlFor="add-name">Name</label>
          <input
            ref={nameRef}
            onChange={handleChange}
            onFocus={handleFocus}
            value={values.name}
            type="text"
            name="name"
            id="add-name"
            className={`form-control ${errors.name && "border-danger"}`}
          />
          <p className="px-1 text-danger">{errors.name}</p>
        </div>

        <div className="form-group">
          <label htmlFor="add-phone">Phone Number</label>
          <input
            onChange={handleChange}
            onFocus={handleFocus}
            value={values.phone}
            type="text"
            name="phone"
            id="add-phone"
            className={`form-control ${errors.phone && "border-danger"}`}
          />
          <p className="px-1 text-danger">{errors.phone}</p>
        </div>
        <button onClick={handleSubmit} className="btn btn-primary w-100">
          {isLoading ? (
            <FontAwesomeIcon icon="spinner" className="fa-spin" />
          ) : (
            "Submit"
          )}
        </button>
        <p className="text-center text-danger mt-3">{responseError}</p>
      </form>
    </div>
  );
};

export default FormModal;
