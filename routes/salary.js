import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addSalary, getSalaries, getSalary } from '../controllers/salaryController.js';

const router = express.Router()

router.get('/', authMiddleware, getSalaries);
router.post('/add', authMiddleware, addSalary);
router.get('/:id/:role', authMiddleware, getSalary);


export default router; 