const validator = require("validator");
const validationMessages = require("./validationMessages");

module.exports = {
  urlValidator: {
    validator(v) {
      return validator.isURL(v) || !v;
    },
    message: validationMessages.GENERAL.URL,
  },
  imageValidator: {
    validator(v) {
      return fetch(v)
        .then((res) =>
          res.ok ? res.headers.get("Content-Type") : Promise.reject(res.status)
        )
        .then((content) => {
          if (content.toString().startsWith("image/")) {
            return Promise.resolve();
          }
          return Promise.reject();
        })
        .catch(() => false);
    },
    message: validationMessages.GENERAL.IMAGE,
  },
  emailValidator: {
    validator(v) {
      return validator.isEmail(v);
    },
    message: validationMessages.GENERAL.EMAIL,
  },
};
