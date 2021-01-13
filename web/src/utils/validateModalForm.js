export default function validateLogin(values) {
  const { name, phone } = values;
  let errors = {};

  if (!name) {
    errors.name = "Name is required";
  }

  if (isNaN(parseInt(phone))) {
    errors.phone = "Invalid phone number";
  }

  if (!phone) {
    errors.phone = "Phone number is required";
  }

  return errors;
}
