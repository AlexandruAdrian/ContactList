import React, { useState, useEffect } from "react";
import axios from "axios";
// Hooks
import useToken from "../../../hooks/useToken";
// Components
import Contact from "./Contact.jsx";
import FormModal from "../FormModal/FormModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Styles
import "./contacts.css";

const Contacts = () => {
  const token = useToken();
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/contacts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContacts([...contacts, ...res.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const filteredContacts = contacts.filter(
          (contact) => contact._id !== id
        );
        setContacts([...filteredContacts]);
      })
      .catch((err) => console.error(err));
  };

  const handleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <section className="mt-3 col-12 col-sm-8 col-md-7 col-lg-6 mx-auto">
      <div
        className="d-none d-lg-block w-50 mx-auto btn btn-primary align-self-center"
        onClick={handleForm}
      >
        Add a contact
      </div>
      {contacts.length > 0 ? (
        (contacts || []).map((contact) => (
          <Contact
            key={contact._id}
            id={contact._id}
            name={contact.name}
            phone={contact.phoneNumber}
            handleDelete={handleDelete}
            contacts={contacts}
            setContacts={setContacts}
          />
        ))
      ) : (
        <div className="text-center mt-5 h5 text-info">
          No contacts added yet
        </div>
      )}
      <div className="add-contact bg-primary rounded-circle d-lg-none">
        <FontAwesomeIcon
          icon="plus"
          className="text-white"
          size="2x"
          onClick={handleForm}
        />
      </div>

      {showForm && (
        <FormModal
          handleForm={handleForm}
          contacts={contacts}
          setContacts={setContacts}
        />
      )}
    </section>
  );
};

export default Contacts;
