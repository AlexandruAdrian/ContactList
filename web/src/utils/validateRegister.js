export default function validateRegister(values) {
  const { name, phone, password } = values;
  let errors = {};

  if (!name || name.trim().length === 0) {
    errors.name = "Name is required";
  }

  if (!phone) {
    errors.phone = "Phone is required";
  }

  if (isNaN(parseInt(phone))) {
    errors.phone = "Invalid phone number";
  }

  if (password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  return errors;
}
