const validator = require("validator");

module.exports = {
  urlValidator: {
    validator(v) {
      return validator.isURL(v);
    },
    message: "You must enter a valid url",
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
    message: "URL is not a valid image",
  },
  emailValidator: {
    validator(v) {
      return validator.isEmail(v);
    },
    message: "You must enter a valid email",
  },
};
