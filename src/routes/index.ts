import express from 'express';
import {
  loginSuccess,
  loginFail
} from '../controller/userController';

const router = express.Router();

router.get('/', loginSuccess);

router.get('/fail-login', loginFail);

export default router