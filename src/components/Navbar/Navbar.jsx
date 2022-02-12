import styled from "styled-components";
import Logo from "../../assets/logoSmall.png";

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Navbar() {
  return (
    <StyledNavbar>
      <Logo />
    </StyledNavbar>
  );
}

export default Navbar;
