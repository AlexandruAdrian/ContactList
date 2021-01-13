import React, { useState } from "react";
import axios from "axios";
// Hooks
import useForm from "../../../hooks/useForm";
import useToken from "../../../hooks/useToken";
// Utils
import validate from "../../../utils/validateModalForm";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Style
import "../FormModal/FormModal.css";

const EditForm = ({
  handleEditForm,
  id,
  name,
  phone,
  contacts,
  setContacts,
}) => {
  const [responseError, setResponseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    name,
    phone,
  };

  const { values, errors, handleChange, handleSubmit, handleFocus } = useForm(
    submit,
    validate,
    initialState,
    setResponseError
  );

  function submit() {
    const token = useToken();
    axios
      .put(
        `http://localhost:3000/api/contacts/${id}`,
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
        setIsLoading(true);
        const newContacts = contacts.map((contact) => {
          if (contact._id === id) {
            contact.name = values.name;
            contact.phoneNumber = values.phone;
          }
          return contact;
        });

        setContacts(newContacts);
        setIsLoading(false);
        handleEditForm();
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
        <div className="close rounded-circle" onClick={handleEditForm}>
          &times;
        </div>
        <div className="form-group">
          <label htmlFor="edit-name">Name</label>
          <input
            onChange={handleChange}
            onFocus={handleFocus}
            value={values.name}
            type="text"
            name="name"
            id="edit-name"
            className={`form-control ${errors.name && "border-danger"}`}
          />
          <p className="px-1 text-danger">{errors.name}</p>
        </div>

        <div className="form-group">
          <label htmlFor="edit-phone">Phone Number</label>
          <input
            onChange={handleChange}
            onFocus={handleFocus}
            value={values.phone}
            type="text"
            name="phone"
            id="edit-phone"
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

export default EditForm;
