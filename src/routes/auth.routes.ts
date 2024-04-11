import { Router } from 'express'
import {login, register, logout, profile} from '../controllers/auth.controller'
import { authRequired } from '../middlewares/validateToken'
const router:Router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)
export default router