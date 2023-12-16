import * as yup from 'yup';

const signUpFormValidation = yup.object().shape({
  username: yup.string().trim().required('Username is a required field'),
  email: yup.string().trim().required('Email is a required field'),
  password: yup.string().trim().required('Password is a required field'),
});

export default signUpFormValidation;
