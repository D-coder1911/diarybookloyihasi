import Joi from 'joi';

export const commentSchema = Joi.object({
  content: Joi.string()
    .min(5)
    .required()
    .trim()
    .messages({
      'string.base': 'Izoh matn formatida bo‘lishi kerak',
      'string.empty': 'Izoh matni bo‘sh bo‘lmasligi kerak',
      'string.min': 'Izoh kamida 5 belgidan iborat bo‘lishi kerak',
      'any.required': 'Izoh talab qilinadi',
    }),
  articleId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Maqola ID si matn formatida bo‘lishi kerak',
      'string.empty': 'Maqola ID si bo‘sh bo‘lmasligi kerak',
      'any.required': 'Maqola ID si talab qilinadi',
    }),
  userId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.base': 'Foydalanuvchi ID si matn formatida bo‘lishi kerak',
      'string.empty': 'Foydalanuvchi ID si bo‘sh bo‘lmasligi kerak',
      'any.required': 'Foydalanuvchi ID si talab qilinadi',
    }),
});
