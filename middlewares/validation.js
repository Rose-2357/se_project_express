const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const validationMessages = require("../utils/validationMessages");

function validateUrl(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.url");
}

function validateEmail(value, helpers) {
  if (validator.isEmail(value)) {
    return value;
  }

  return helpers.error("string.email");
}

const nameField = Joi.string().required().min(2).max(30).messages({
  "string.empty": validationMessages.NAME.REQUIRED,
  "string.min": validationMessages.NAME.MIN,
  "string.max": validationMessages.NAME.MAX,
});

module.exports.validateCardBody = celebrate({
  body: {
    name: nameField,
    weather: Joi.string().required().valid("cold", "warm", "hot").messages({
      "string.empty": validationMessages.WEATHER.REQUIRED,
      "any.only": validationMessages.WEATHER.ENUM,
    }),
    imageUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": validationMessages.IMAGE_URL.REQUIRED,
      "string.url": validationMessages.GENERAL.URL,
    }),
  },
});

module.exports.validateUserBody = celebrate({
  body: {
    name: nameField,
    avatar: Joi.string().allow("").custom(validateUrl).messages({
      "string.url": validationMessages.GENERAL.URL,
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": validationMessages.EMAIL.REQUIRED,
      "string.email": validationMessages.GENERAL.EMAIL,
    }),
    password: Joi.string().required().messages({
      "string.empty": validationMessages.PASSWORD.REQUIRED,
    }),
  },
});

module.exports.validateUserLoginBody = celebrate({
  body: {
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": validationMessages.EMAIL.REQUIRED,
      "string.email": validationMessages.GENERAL.EMAIL,
    }),
    password: Joi.string().required().messages({
      "string.empty": validationMessages.PASSWORD.REQUIRED,
    }),
  },
});

module.exports.validateUserUpdateBody = celebrate({
  body: {
    name: nameField,
    avatar: Joi.string().allow("").custom(validateUrl).messages({
      "string.url": validationMessages.GENERAL.URL,
    }),
  },
});

module.exports.validateId = celebrate({
  params: {
    id: Joi.string().hex().length(24).required().messages({
      "string.empty": "The id field must be filled",
      "string.hex": "The id must be a hexadecimal string",
      "string.length": "The id must be 24 characters long",
    }),
  },
});
