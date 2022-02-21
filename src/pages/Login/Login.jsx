import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../contexts/KebappContext";
import { useApi } from "../../contexts/AuthContext";

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
  const { setIsAuth } = useAppState();
  const { register, handleSubmit } = useForm();
  const api = useApi();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    api.loginUser(data).then((response) => {
      localStorage.setItem("token", response.data.access_token);
      setIsAuth(true);
    });
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
