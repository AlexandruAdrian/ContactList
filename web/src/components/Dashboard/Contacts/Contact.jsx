import React, { useState } from "react";
// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditForm from "../EditForm/EditForm.jsx";
// Hooks
import useToken from "../../../hooks/useToken";
// Style
import "./contacts.css";

const Contact = ({ id, name, phone, handleDelete, contacts, setContacts }) => {
  const token = useToken();
  const [showEdit, setShowEdit] = useState(false);

  const handleEditForm = () => {
    setShowEdit(!showEdit);
  };

  return (
    <section className="card bg-white mt-2 mx-auto border border-dark contact">
      <div className="tools">
        <FontAwesomeIcon
          icon="pencil-alt"
          className="text-primary"
          size="lg"
          onClick={handleEditForm}
        />
        <FontAwesomeIcon
          icon="trash-alt"
          className="text-danger"
          size="lg"
          onClick={() => handleDelete(id)}
        />
      </div>
      <div className="card-body">
        <FontAwesomeIcon
          icon="user"
          className="text-primary card-title"
          size="2x"
        />
        <p className="card-text">
          Name: <span className="font-weight-bold ">{name}</span>
        </p>
        <p className="card-text">
          Phone number: <span className="font-weight-bold">{phone}</span>
        </p>
      </div>

      {showEdit && (
        <EditForm
          handleEditForm={handleEditForm}
          id={id}
          name={name}
          phone={phone}
          contacts={contacts}
          setContacts={setContacts}
        />
      )}
    </section>
  );
};

export default Contact;
