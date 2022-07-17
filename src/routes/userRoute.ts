import { Router } from 'express';
import {
  userSignIn,
  signUp,
  verifyUser,
  getUser,
  getUserById,
  postForgotPassword,
  postResetPassword,
  changePassword,
} from '../controller/userController';
import { auth } from '../middlewares/authorization-middleware';

const router = Router();

router.get('/', getUser);
router.get('/:id', getUserById);
router.post('/signup', signUp);
router.get('/verify/:secretToken', verifyUser);
router.post('/signin', userSignIn);
router.post('/forgot-password', postForgotPassword);
router.post('/reset-password/:token', postResetPassword);
router.post('/change-password', auth, changePassword);

export default router;
