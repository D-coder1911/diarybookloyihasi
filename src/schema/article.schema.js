import Joi from "joi";

export const createArticleSchema = Joi.object({
  title: Joi.string().min(10).max(100).required(),
  content: Joi.string().min(50).required(),
  categoryId: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
}).required();
