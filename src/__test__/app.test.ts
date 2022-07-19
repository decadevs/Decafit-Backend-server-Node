import 'dotenv/config';
import app from '../app';
import supertest from 'supertest';
import { User } from '../model/userModel';
import bcrypt from 'bcryptjs';
const request = supertest(app);

beforeAll(async () => {
  // Register
  let register = await User.create({
    fullName: 'Damilola Babalola',
    email: 'user@example.com',
    phoneNumber: '07066848884',
    password: bcrypt.hashSync('seunayo', 8),
  });
  register.active = true;
  register.save();
});
jest.setTimeout(30000);

//  Login
describe('Endpoints testing', () => {
  test('should Login a user', async () => {
    let login = await request.post('/users/signin').send({ email: 'user@example.com', password: 'seunayo' });
    expect(login.body).toHaveProperty('token');
    expect(login.body.status).toBe('Successfully logged in');
  });

   //  Forgot Password & Reset Password
   test('should be able to do forgot and reset password for users', async () => {
    const forgotPassword = await request.post('/users/forgot-password').send({ email: 'user@example.com' });
    const resetPassword = await request
      .post(`/users/reset-password/${forgotPassword.body.token}`)
      .send({
        password: 'seunayo',
        confirmPassword: 'seunayo',
      });

    expect(resetPassword.body).toHaveProperty('message');
  });

// CHANGE PASSWORD FROM DASHBOARD
test('users should change their password from dashboard', async () => {
 let login = await request.post('/users/signin').send({ email: 'user@example.com', password: 'seunayo' });
  const changePassword = await request
    .post('/users/change-password')
    .set('authorization', `Bearer ${login.body.token}`)
    .send({
      oldPassword: 'seunayo',
      newPassword: 'eyiyemi',
      repeatPassword: 'eyiyemi',
    });
  expect(changePassword.body.message).toBe('You have successfully changed your password');
});
});
