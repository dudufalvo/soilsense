import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(40, 'Username must not exceed 40 characters'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  rememberMe: yup.boolean().required()
})
