import * as yup from 'yup'

export const profileValidationSchema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  username: yup.string().required(),
})
