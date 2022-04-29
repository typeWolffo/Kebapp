/* eslint-disable prettier/prettier */
import { useState } from "react";
import styled from "styled-components";

const StyledEventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  width: 100%;
  height: 100%;
`;

const StyledEvent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 15px;
  font-family: Ubuntu, sans-serif;
  color: ${({ theme }) => theme.accentColor};
  height: 76px;
  width: 290px;
  border: 1px solid ${({ theme }) => theme.accentColor};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.primaryColor};
`;

const StyledEventDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  span:nth-child(1) {
    font-size: 18px;
  }

  span:nth-child(2),
  span:nth-child(3) {
    font-size: 12px;
  }
`;

const StyledApprove = styled.div`
  height: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const [events, setEvents] = useState();
  // const api = useApi();
  // useEffect(() => {
  //   api.get("/events", (status, response) => setEvents(response.data.events));
  // }, []);

  const weekdays = {
    0: "Niedziela",
    1: "Poniedziałek",
    2: "Wtorek",
    3: "Środa",
    4: "Czwartek",
    5: "PJONTEK",
    6: "Sobota",
  };

  const getKebsDate = (event) => {
    const date = new Date(event);

    return {
      date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
      day: String(date.getDay()),
      hour: String(date.getHours()),
      minute: String(date.getMinutes()),
    };
  };

  return (
    <StyledEventsWrapper>
      {events &&
        events.map(
          // eslint-disable-next-line no-unused-vars
          ({ id, location, start_at: startAt, created_at: createdAt }) => (
            <StyledEvent key={createdAt}>
              <StyledEventDetails>
                <span>{location}</span>
                <span>{`${weekdays[getKebsDate(startAt).day]} (${getKebsDate(startAt).date})`}</span>
                <span>{`${getKebsDate(startAt).hour}:${getKebsDate(startAt).minute.padStart(2, "0")}`}</span>
              </StyledEventDetails>
              <StyledApprove
              // onClick={() =>
              //   api
              //     .post(`/events/${id}/members`, {
              //       user_id: user.id,
              //     })
              //     .then((response) => console.log(response))
              // }
              >
                <span>ok</span>
              </StyledApprove>
            </StyledEvent>
          )
        )}
    </StyledEventsWrapper>
  );
}

export default Home;
