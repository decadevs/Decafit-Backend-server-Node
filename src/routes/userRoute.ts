import { Router } from 'express';
import {
  verifyUser,
} from '../controller/user/userController';

const router = Router();

router.get('/verify/:secretToken', verifyUser);

export default router;
