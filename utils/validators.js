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
      return new Promise((reject, resolve) => {
        const img = new Image();
        img.src = v;
        img.onload = resolve();
        img.onerror = reject();
      });
    },
    message: "URL is not a valid image",
  },
};
