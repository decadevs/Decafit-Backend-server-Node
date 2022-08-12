import { Router } from 'express';
import {verifyUser} from '../controller/user/userController'
import {
  loginSuccess,
  loginFail
} from '../controller/user/userController';

const router = Router();
router.get('/user/verified/:secretToken', verifyUser);
router.get('/', loginSuccess);
router.get('/', loginFail);

export default router