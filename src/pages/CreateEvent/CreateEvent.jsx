import styled from "styled-components";
import { useForm } from "react-hook-form";

const CreateWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
      width: 60%;
      height: 40px;
      margin: 5px 0;
      padding: 0 10px;
    }
  }
`;

function CreateEvent() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <CreateWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("place")} list="kebsOptions" placeholder="Jaka miejscuwa wariacie" />
        <datalist id="kebsOptions">
          <option value="Nazar">Nazar</option>
          <option value="Diamond">Diamond</option>
          <option value="Diamond Bielsko">Diamond Bielsko</option>
        </datalist>
        <input type="datetime-local" {...register("dateTime")} />
        <button type="submit">ok</button>
      </form>
    </CreateWrapper>
  );
}

export default CreateEvent;
