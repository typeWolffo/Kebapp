import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { loginUser } from '../../slices/auth'
import { clearMessage } from '../../slices/message'
import { RootState, useAppDispatch } from '../../store/store'
import { LoginUserDataType } from '../../types/LoginUserDataType'

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 80%;
`

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { register, handleSubmit } = useForm<LoginUserDataType>()

  const { isLoggedIn } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(clearMessage())
  }, [dispatch])

  const onSubmit = (data: LoginUserDataType) => {
    const { email, password } = data
    dispatch(loginUser({ email, password })).unwrap()
    if (isLoggedIn) navigate('/')
  }

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register('email', { required: 'Field login is required' })} className="input input-bordered input-primary w-full max-w-xs mb-5" />
        <input type="password" placeholder="Password" {...register('password', { required: 'Field password is required' })} className="input input-bordered input-primary w-full max-w-xs mb-5" />
        <button type="submit" className="btn btn-primary w-10/12">
          Login
        </button>
      </StyledForm>
      <div className="divider px-10">OR</div>
      <button type="button" className="btn btn-ghost" onClick={() => navigate('/register')}>
        Register
      </button>
    </StyledFormWrapper>
  )
}
export default Login
