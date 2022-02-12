import styled from "styled-components";
import { useState } from "react";
import api from "../services/api";

const StyledPrimary = styled.div`
  background-color: ${({ theme }) => theme.primaryColor};
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Ubuntu, sans-serif;
  text-transform: uppercase;
`;

const StyledAccent = styled.div`
  background-color: ${({ theme }) => theme.accentColor};
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Ubuntu, sans-serif;
  text-transform: uppercase;
`;

const StyledBackground = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Ubuntu, sans-serif;
  text-transform: uppercase;
`;

function Test() {
  const [test, setTest] = useState();
  api.get("/test", (status, response) => setTest(response.test));
  console.log(test);
  return (
    <>
      <StyledPrimary>primary</StyledPrimary>
      <StyledAccent>accent</StyledAccent>
      <StyledBackground>background</StyledBackground>
      {test}
    </>
  );
}

export default Test;
