import Joi from 'joi';
export const loginSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().min(8).required() });
export const registerSchema = loginSchema.keys({ firstName: Joi.string().required(), lastName: Joi.string().required(), phone: Joi.string().allow('', null), employeeNo: Joi.string().required() });
export const attendanceSchema = Joi.object({ qrToken: Joi.string().required(), latitude: Joi.number().required(), longitude: Joi.number().required() });
export const catalogSchema = Joi.object({ name: Joi.string().required(), description: Joi.string().allow('', null) });
export const positionSchema = Joi.object({ title: Joi.string().required(), description: Joi.string().allow('', null) });
export const scheduleSchema = Joi.object({ name: Joi.string().required(), startTime: Joi.string().required(), endTime: Joi.string().required(), graceMinutes: Joi.number().integer().min(0).default(10) });
