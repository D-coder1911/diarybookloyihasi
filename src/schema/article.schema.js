import Joi from 'joi';

export const articleSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(150)
    .required()
    .trim()
    .messages({
      'string.base': 'Maqola sarlavhasi matn bo‘lishi kerak',
      'string.empty': 'Maqola sarlavhasi bo‘sh bo‘lmasligi kerak',
      'string.min': 'Maqola sarlavhasi kamida 5 belgidan iborat bo‘lishi kerak',
      'string.max': 'Maqola sarlavhasi 150 belgidan oshmasligi kerak',
      'any.required': 'Maqola sarlavhasi talab qilinadi',
    }),
  content: Joi.string()
    .min(20)
    .required()
    .trim()
    .messages({
      'string.base': 'Matn formatida yozilishi kerak',
      'string.empty': 'Maqola mazmuni bo‘sh bo‘lmasligi kerak',
      'string.min': 'Maqola mazmuni kamida 20 belgidan iborat bo‘lishi kerak',
      'any.required': 'Maqola mazmuni talab qilinadi',
    }),
  tags: Joi.array()
    .items(Joi.string().hex().length(24))
    .default([])
    .messages({
      'array.base': 'Teglar ro‘yxati formatda bo‘lishi kerak',
      'string.hex': 'Teg ID to‘g‘ri formatda bo‘lishi kerak',
    }),
  author: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Muallif ID si matn bo‘lishi kerak',
      'string.empty': 'Muallif ID si bo‘sh bo‘lmasligi kerak',
      'any.required': 'Muallif ID si talab qilinadi',
    }),
});
