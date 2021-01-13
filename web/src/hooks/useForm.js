import { useState, useEffect } from "react";

const useForm = (cb, validate, initialState, setResponseError) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetValues = () => {
    setValues({
      name: "",
      phone: "",
    });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    setResponseError("");
    if (Object.keys(errors).length === 0 && isSubmitting) {
      cb();
    }
  }, [errors]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleFocus,
    resetValues,
  };
};

export default useForm;
