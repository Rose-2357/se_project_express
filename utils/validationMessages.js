module.exports = {
  NAME: {
    REQUIRED: 'The "name" field must be filled',
    MIN: 'The minimum length of the "name" field is 2',
    MAX: 'The maximum length of the "name" field is 30',
  },
  WEATHER: {
    REQUIRED: 'The "weather" field must be filled',
    ENUM: 'The "weather" field must be one of the following values: hot, warm, cold',
  },
  IMAGE_URL: {
    REQUIRED: 'The "imageUrl" field must be filled',
  },
  OWNER: {
    REQUIRED: 'The "owner" field must be filled',
  },
  EMAIL: {
    REQUIRED: 'The "email" field must be filled',
  },
  PASSWORD: {
    REQUIRED: 'The "password" field must be filled',
  },
  GENERAL: {
    URL: "You must enter a valid url",
    IMAGE: "URL is not a valid image",
    EMAIL: "You must enter a valid email",
  },
};
