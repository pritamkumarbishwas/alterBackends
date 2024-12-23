import Joi from "joi";

const createShortUrl = {
  body: Joi.object().keys({
    longUrl: Joi.string().uri().required().messages({
      "string.base": "Long URL must be a string",
      "string.uri": "Long URL must be a valid URI",
      "string.empty": "Long URL is required",
      "any.required": "Long URL is required",
    }),
    customAlias: Joi.string().optional().messages({
      "string.base": "Custom alias must be a string",
    }),
    topic: Joi.string().optional().messages({
      "string.base": "Topic must be a string",
    }),
  }),
};

const redirectShortUrl = {
  params: Joi.object().keys({
    alias: Joi.string().required().messages({
      "string.base": "Alias must be a string",
      "string.empty": "Alias is required",
      "any.required": "Alias is required",
    }),
  }),
};

export { createShortUrl, redirectShortUrl };
