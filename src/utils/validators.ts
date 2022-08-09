import { ValidationResult } from '../interfaces/validation.types';

export const validateEmail = (email:string): ValidationResult => {
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  if (!email.match(regEx)) {
    return {
      error: {email: 'Email must be a valid email address'},
      valid: false,
    }
  }
  return {valid: true};
};

const phoneNumberRegex = 
/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

export const validatePhone = (phoneNumber:string): ValidationResult => {
  if (!phoneNumber.match(phoneNumberRegex)) {
    return {
      error: {phone: 'Phone number must be a valid phone number'},
      valid: false,
    }
  }
  return {valid: true};
};

