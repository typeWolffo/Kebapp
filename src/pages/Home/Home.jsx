import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../services/api";

const StyledEventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 0;
  width: 100%;
  height: 100%;
`;
const StyledEvent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  font-family: Ubuntu, sans-serif;
  color: ${({ theme }) => theme.accentColor};
`;

function Home() {
  const [events, setEvents] = useState();
  useEffect(() => {
    // const test = api.get("/events", (status, response) => response.data.events);
    api.get("/events", (status, response) => setEvents(response.data.events));
  }, []);
  console.log(events);

  return (
    <StyledEventsWrapper>
      {events &&
        events.map((event) => (
          <StyledEvent>
            <h3>{event.location}</h3>
            <h3>{event.start_at}</h3>
          </StyledEvent>
        ))}
    </StyledEventsWrapper>
  );
}

export default Home;
