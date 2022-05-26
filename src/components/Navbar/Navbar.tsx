import styled from "styled-components";
import { Link } from "react-router-dom";
import { Cog } from "@styled-icons/boxicons-regular/Cog";
import { MessageSquareAdd } from "@styled-icons/boxicons-regular/MessageSquareAdd";
import { Home } from "@styled-icons/boxicons-regular/Home";

const SettingsIcon = styled(Cog)`
  color: ${({ theme }) => theme.accentColor};
  width: 32px;
  height: 32px;
  padding: 10px;
`;
const AddIcon = styled(MessageSquareAdd)`
  color: ${({ theme }) => theme.accentColor};
  width: 32px;
  height: 32px;
  padding: 10px;
`;
const HomeIcon = styled(Home)`
  color: ${({ theme }) => theme.accentColor};
  width: 32px;
  height: 32px;
  padding: 10px;
`;

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.backgroundColor};
  flex-wrap: nowrap;
  height: 60px;
  border-top: 1px solid ${({ theme }) => theme.accentColor};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

function Navbar() {
  return (
    <StyledNavbar>
      <Link to="create-event">
        <AddIcon />
      </Link>
      <Link to="/">
        <HomeIcon />
      </Link>
      <Link to="settings">
        <SettingsIcon />
      </Link>
    </StyledNavbar>
  );
}

export default Navbar;
