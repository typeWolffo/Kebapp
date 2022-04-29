import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../slices/message";
import { loginUser } from "../../slices/auth";

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  span {
    color: ${({ theme }) => theme.accentColor};
    margin: 10px 0;
    font-family: Ubuntu, sans-serif;
    display: flex;
    align-items: center;

    :before,
    :after {
      content: "";
      width: 50px;
      height: 1px;
      margin: 0 5px;
      background-color: ${({ theme }) => theme.accentColor};
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 80%;

  input {
    height: 45px;
    margin: 10px 0;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.accentColor};
    background-color: transparent;
    color: ${({ theme }) => theme.fontColor};
    outline: none;
    border-style: solid;
  }

  button {
    background-color: ${({ theme }) => theme.primaryColor};
    border: 1px solid ${({ theme }) => theme.accentColor};
    border-radius: 5px;
    color: ${({ theme }) => theme.fontColor};
    width: 200px;
    height: 45px;
    align-self: center;
  }
`;

const StyledRegisterButton = styled.button`
  background-color: ${({ theme }) => theme.primaryColor};
  border: 1px solid ${({ theme }) => theme.accentColor};
  border-radius: 5px;
  color: ${({ theme }) => theme.fontColor};
  width: 180px;
  height: 40px;
  align-self: center;
`;

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    dispatch(loginUser({ email, password }))
      .unwrap()
      .catch(() => setLoading(false));
    if (isLoggedIn) navigate("/");
  };

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("email", { required: "Field login is required" })} />
        <input type="password" {...register("password", { required: "Field password is required" })} />
        <button type="submit">Login</button>
      </StyledForm>
      <span>OR</span>
      <StyledRegisterButton type="button" onClick={() => navigate("/register")}>
        Register
      </StyledRegisterButton>
    </StyledFormWrapper>
  );
}
export default Login;
