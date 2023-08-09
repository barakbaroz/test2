import PropTypes from "prop-types";
import styled from "styled-components";
import background from "../../assets/Backgrounds/wave_background.svg";
import { Link } from "react-router-dom";

const Wrapper = ({ children, onBack }) => {
  return (
    <Container>
      <Inner>
        {children}
        <ButtonContainer>
          <Button to={-1} onClick={onBack}>
            חזור
          </Button>
        </ButtonContainer>
      </Inner>
    </Container>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  onBack: PropTypes.func,
};

export default Wrapper;

const Container = styled.div`
  height: calc(100dvh - var(--header-size));
  width: 100vw;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
`;

const Inner = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding-block-end: 2rem;
  box-sizing: border-box;
`;

const Button = styled(Link)`
  background-color: #f02a4c;
  border-radius: 200px;
  border: none;
  color: #ffffff;
  padding: 0.3rem 3rem;
  font-size: 1.063rem;
  font-family: inherit;
  text-decoration: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-block: 2rem;
`;
