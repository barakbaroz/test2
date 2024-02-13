import styled from "styled-components";
import gistLogo from "../../assets/Logos/gist_logo.svg";
import hospitalLogo from "../../assets/Logos/hospital_logo.png";
import PropTypes from "prop-types";

function GisterHeader({ text }) {
  return (
    <Container id="coordinator-header">
      <Logo src={hospitalLogo} />
      <Text>{text}</Text>
      <Logo src={gistLogo} />
    </Container>
  );
}

GisterHeader.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
};

export default GisterHeader;

const Container = styled.div`
  box-shadow: 0 0 10px 0px grey;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;
const Logo = styled.img`
  height: 40px;
`;

const Text = styled.div`
  font-size: 1.5rem;
  color: #84a4fc;
`;
