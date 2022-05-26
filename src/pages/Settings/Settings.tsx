import { Telegram } from "@styled-icons/boxicons-logos/Telegram";
import { Github } from "@styled-icons/boxicons-logos/Github";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TelegramIcon = styled(Telegram)`
  color: ${({ theme }) => theme.accentColor};
  width: 45px;
  height: 45px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.accentColor};
  border-radius: 5px;
`;

const GithubIcon = styled(Github)`
  color: ${({ theme }) => theme.accentColor};
  width: 45px;
  height: 45px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.accentColor};
  border-radius: 5px;
`;

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    font-family: Ubuntu, sans-serif;
    font-size: 24px;
    color: ${({ theme }) => theme.accentColor};
    margin-bottom: 30px;
  }
`;
const StyledIcons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const handleLogout = () => {
  localStorage.removeItem("token");
  document.location.assign("/");
};

function Settings() {
  return (
    <StyledWrapper>
      <span>Report bug</span>
      <StyledIcons>
        <a href="https://github.com/typeWolffo/Kebapp/issues">
          <GithubIcon />
        </a>
        <a href="https://t.me/typeWolffo">
          <TelegramIcon />
        </a>
        <button type="button" onClick={handleLogout}>
          IO
        </button>
      </StyledIcons>
    </StyledWrapper>
  );
}

export default Settings;
