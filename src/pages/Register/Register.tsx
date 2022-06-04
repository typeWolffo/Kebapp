/* eslint-disable camelcase */
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../slices/auth'
import { RegisterUserDataType } from '../../types/RegisterUserDataType'

const StyledFormWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 80%;

  p {
    color: ${({ theme }) => theme.errorColor};
    height: 12px;
    font-size: 10px;
  }

  input {
    height: 45px;
    margin: 10px 0;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.accentColor};
    background-color: transparent;
    color: ${({ theme }) => theme.fontColor};
    outline: none;
    border-style: solid;
    padding: 0 15px;
  }

  button {
    background-color: ${({ theme }) => theme.primaryColor};
    border: 1px solid ${({ theme }) => theme.accentColor};
    border-radius: 5px;
    color: ${({ theme }) => theme.fontColor};
    width: 200px;
    height: 45px;
    align-self: center;
    margin-top: 20px;
  }
`

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    name: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  const formOptions = { resolver: yupResolver(validationSchema) }

  const { register, handleSubmit, formState } = useForm<RegisterUserDataType>(formOptions)
  const { errors } = formState

  const onSubmit = (data: RegisterUserDataType) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, email, password, password_confirmation } = data
    dispatch(registerUser({ email, name, password, password_confirmation }))
    navigate('/')
  }

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" {...register('name')} />
        <p>{errors.name?.message}</p>
        <input type="text" placeholder="Email" {...register('email')} />
        <p>{errors.email?.message}</p>
        <input type="password" placeholder="Password" {...register('password')} />
        <p>{errors.password?.message}</p>

        <input type="password" placeholder="Confirm password" {...register('password_confirmation')} />
        <p>{errors.password_confirmation?.message}</p>

        <button type="submit">Register</button>
      </StyledForm>
    </StyledFormWrapper>
  )
}
export default Register
