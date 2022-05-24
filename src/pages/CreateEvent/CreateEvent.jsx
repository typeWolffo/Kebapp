import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../slices/event";
import message from "../../slices/message";

const CreateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  form {
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
  }
`;

function CreateEvent() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = ({ location, startAt }) => {
    const eventData = {
      location,
      start_at: new Date(startAt).toISOString(),
    };
    dispatch(createEvent(eventData));
  };

  return (
    <CreateWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("location")} list="kebsOptions" placeholder="Jaka miejscuwa wariacie" />
        <datalist id="kebsOptions">
          <option value="Nazar">Nazar</option>
          <option value="Diamond">Diamond</option>
          <option value="Diamond Bielsko">Diamond Bielsko</option>
        </datalist>
        <input type="datetime-local" {...register("startAt")} />
        <button type="submit">Gituwa</button>
      </form>
    </CreateWrapper>
  );
}

export default CreateEvent;
