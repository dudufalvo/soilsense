import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { registerValidationSchema } from 'src/schemas'

import type { SignUpType } from 'types/User'

import styles from './signup.module.scss'

import AuthTemplate from 'components/AuthTemplate'
import InputPassword from 'components/Form/InputPassword'
import InputText from 'components/Form/InputText'
import toast from 'utils/toast'

type SignUpAxiosType = {
  name: string,
  email: string,
  password: string,
  password2: string,
  image: string
}

const SignUp = () => {
  const navigate = useNavigate()

  const methods = useForm<SignUpType>({
    resolver: yupResolver(registerValidationSchema)
  })

  const signUpUser = async (data: SignUpType) => {
    console.log(data)

    const signUpData: SignUpAxiosType = {
      name: data.name,
      email: data.email,
      password: data.password,
      password2: data.password2,
      image: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp'
    }

    axios.post(`${import.meta.env.VITE_API_REQUEST_URL}/register/`, { user: signUpData })
      .then(response => {
        localStorage.setItem('token', response.headers.authorization)
        toast.success('Signed up successfully')
        navigate('/home')
      })
      .catch(() => {
        toast.error('Failed to sign up')
      })
  }

  return (
    <AuthTemplate type='sign-up' methods={methods} handleAuth={methods.handleSubmit(signUpUser)} >
      <form className={styles.signupContentMiddle}>
        <InputText type="text" id="name" name="name" placeholder="Enter your name" label="Name" isRequired={true} />
        <InputText type="text" id="email" name="email" placeholder="Enter your e-mail" label="E-mail" isRequired={true} />
        <InputPassword id="password" name="password" placeholder="Create a password" label="Password" isRequired={true} />
        <InputPassword id="password_confirmation" name="password_confirmation" placeholder="Confirm the password" label="Confirm password" isRequired={true} />
      </form>
    </AuthTemplate>
  )
}

export default SignUp
