import { Router } from 'express';
import {verifyUser} from '../controller/user/userController'
import {
  loginSuccess,
  loginFail
} from '../controller/user/userController';

const router = Router();
router.get('/user/verified/:secretToken', verifyUser);
router.get('/ext/auth/login', loginSuccess);
router.get('/ext/auth/fail-login', loginFail);

export default router