import styled from "styled-components";
import gistLogo from "../../assets/Logos/gist_logo.svg";
import hospitalLogo from "../../assets/Logos/hospital_logo.png";

const Header = () => {
  return (
    <Container id="HeaderContainer">
      <HospitalLogo alt="Hospital Logo" src={hospitalLogo} />
      <Logo alt="Gist Logo" src={gistLogo} />
    </Container>
  );
};
export default Header;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block-start: var(--header-block-padding);
  padding-inline: var(--header-inline-padding);
`;

const Logo = styled.img`
  height: var(--header-logo-height);
`;

const HospitalLogo = styled.img`
  width: 7.5rem;
  height: 3.25rem;
`;
