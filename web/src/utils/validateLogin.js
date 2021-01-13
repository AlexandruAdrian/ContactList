export default function validateLogin(values) {
  const { phone, password } = values;
  let errors = {};

  if (!phone) {
    errors.phone = "Phone is required";
  }

  if (isNaN(parseInt(phone))) {
    errors.phone = "Invalid phone number";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
}
