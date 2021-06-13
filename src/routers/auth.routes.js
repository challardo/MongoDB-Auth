import {Router} from 'express'
const router = Router()
import * as authController from '../controllers/auth.controller'
router.post('/login', authController.login)

router.post('/register', authController.register)
export default router;