import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppState } from "../../contexts/KebappContext";
import { useApi } from "../../contexts/AuthContext";

const StyledFormWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
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

function Login({ setToken }) {
  const { register, handleSubmit } = useForm();
  const api = useApi();

  const onSubmit = (data) => {
    console.log(data);
    api.loginUser(data).then((response) => console.log(response));
  };

  return (
    <StyledFormWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("email", { required: "Field login is required" })} />
        <input type="password" {...register("password", { required: "Field password is required" })} />
        <button type="submit">Login</button>
      </StyledForm>
    </StyledFormWrapper>
  );
}
export default Login;
