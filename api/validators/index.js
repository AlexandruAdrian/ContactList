const ObjectId = require("mongoose").Types.ObjectId;

const isObjectIdValid = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) !== id) {
      return false;
    }

    return true;
  }

  return false;
};

module.exports = {
  isObjectIdValid,
};
