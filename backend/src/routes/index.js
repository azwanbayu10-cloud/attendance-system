import { Router } from 'express';
import multer from 'multer';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { appModuleSchema, attendanceSchema, catalogSchema, loginSchema, positionSchema, registerSchema, scheduleSchema } from '../validators/schemas.js';
import * as auth from '../controllers/authController.js';
import * as admin from '../controllers/adminController.js';
import * as attendance from '../controllers/attendanceController.js';
const upload = multer({ dest: 'uploads/' }); const router = Router();
router.post('/auth/register', validate(registerSchema), auth.register); router.post('/auth/login', validate(loginSchema), auth.login); router.get('/auth/me', authenticate, auth.me);
router.post('/profile/avatar', authenticate, upload.single('avatar'), (req,res)=>res.json({ path:req.file.path }));
router.post('/attendance/check-in', authenticate, authorize('EMPLOYEE'), validate(attendanceSchema), attendance.checkIn); router.post('/attendance/check-out', authenticate, authorize('EMPLOYEE'), validate(attendanceSchema), attendance.checkOut); router.get('/attendance/history', authenticate, attendance.history);
router.get('/admin/dashboard', authenticate, authorize('ADMIN'), admin.dashboard); router.get('/admin/employees', authenticate, authorize('ADMIN'), admin.listEmployees); router.patch('/admin/employees/:id', authenticate, authorize('ADMIN'), admin.updateEmployee); router.post('/admin/qr', authenticate, authorize('ADMIN'), admin.generateQr); router.get('/admin/monitor', authenticate, authorize('ADMIN'), admin.monitor); router.get('/admin/reports', authenticate, authorize('ADMIN'), admin.reports);
for (const [path, model, schema] of [['departments','department',catalogSchema],['positions','position',positionSchema],['schedules','workSchedule',scheduleSchema],['modules','appModule',appModuleSchema]]) { const c = admin.makeCrud(model); router.get(`/admin/${path}`, authenticate, authorize('ADMIN'), c.list); router.post(`/admin/${path}`, authenticate, authorize('ADMIN'), validate(schema), c.create); router.patch(`/admin/${path}/:id`, authenticate, authorize('ADMIN'), validate(schema), c.update); router.delete(`/admin/${path}/:id`, authenticate, authorize('ADMIN'), c.remove); }
export default router;
