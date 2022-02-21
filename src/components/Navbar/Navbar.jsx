import styled from "styled-components";

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: nowrap;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

function Navbar() {
  return (
    <StyledNavbar>
      <div>a</div>
      <div>b</div>
      <div>c</div>
    </StyledNavbar>
  );
}

export default Navbar;
