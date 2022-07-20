interface createUserRegisterInput {
  fullName: string;
  phoneNumber:string
  email: string;
  password: string;
}

interface createUserLoginInput {
  email: string;
  password: string;
}
interface Obj {
    errors:{ [key: string]: string }
    valid:boolean
}
// User validation
export const validateRegisterInput = (userObj: createUserRegisterInput):Obj => {
  const errors: { [key: string]: string } = {};
  if (userObj.fullName.trim() === '') {
    errors.fullName = 'fullname must not be empty';
  }
  if (userObj.email.trim().toLowerCase() === '') {
    errors.email = 'Emails must not be empty';
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!userObj.email.match(regEx)) {
      errors.email = 'Email must be a valid email address';
    }
  }
  if (userObj.password.toLowerCase() === '') {
    errors.password = 'Password must not be empty';
  }
  const regExr = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
  if (!userObj.phoneNumber.match(regExr)){
    errors.phoneNumber = 'Phone number must be a valid phone number';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// Login validation
export const validateLoginInput = (userObj: createUserLoginInput): Obj => {
  const errors: { [key: string]: string } = {};
  if (userObj.email.trim() === '') {
     errors.email = 'Email must not be empty';
  }
  if (userObj.password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
