import Joi from 'joi';

export const categorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .trim()
    .messages({
      'string.base': 'Kategoriya nomi matn formatida bo‘lishi kerak',
      'string.empty': 'Kategoriya nomi bo‘sh bo‘lmasligi kerak',
      'string.min': 'Kategoriya nomi kamida 3 belgidan iborat bo‘lishi kerak',
      'string.max': 'Kategoriya nomi 100 belgidan oshmasligi kerak',
      'any.required': 'Kategoriya nomi talab qilinadi',
    }),
  description: Joi.string()
    .allow(null, '')
    .max(300)
    .trim()
    .messages({
      'string.base': 'Tavsif matn formatida bo‘lishi kerak',
      'string.max': 'Tavsif 300 belgidan oshmasligi kerak',
    }),
  articles: Joi.array()
    .items(Joi.string().hex().length(24))
    .default([])
    .messages({
      'array.base': 'Maqolalar ro‘yxati formatda bo‘lishi kerak',
    }),
});
