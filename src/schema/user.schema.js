import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .trim()
    .messages({
      'string.base': 'Foydalanuvchi nomi matn formatida bo‘lishi kerak',
      'string.empty': 'Foydalanuvchi nomi bo‘sh bo‘lmasligi kerak',
      'string.min': 'Foydalanuvchi nomi kamida 3 belgidan iborat bo‘lishi kerak',
      'string.max': 'Foydalanuvchi nomi 50 belgidan oshmasligi kerak',
      'any.required': 'Foydalanuvchi nomi talab qilinadi',
    }),
  email: Joi.string()
    .email()
    .required()
    .trim()
    .messages({
      'string.base': 'Email formatida bo‘lishi kerak',
      'string.empty': 'Email bo‘sh bo‘lmasligi kerak',
      'string.email': 'To‘g‘ri email kiriting',
      'any.required': 'Email talab qilinadi',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'Parol matn formatida bo‘lishi kerak',
      'string.empty': 'Parol bo‘sh bo‘lmasligi kerak',
      'string.min': 'Parol kamida 6 belgidan iborat bo‘lishi kerak',
      'any.required': 'Parol talab qilinadi',
    }),
  roles: Joi.array()
    .items(Joi.string().valid('VIEWER', 'SUPER_ADMIN', 'LIBERY_OWNER', 'ADMIN', 'USER'))
    .default(['USER'])
    .messages({
      'array.base': 'Rollar ro‘yxati formatida bo‘lishi kerak',
    }),
});
