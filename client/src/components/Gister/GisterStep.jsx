import styled from "styled-components";
import PropTypes from "prop-types";

function GisterStep({ stepNumber, children, title, subTitle }) {
  return (
    <StepContainer>
      <InformationContainer>
        <StepNumber>{stepNumber}</StepNumber>
        <Text>
          <Title>{title}</Title> <SubTitle>{subTitle}</SubTitle>
        </Text>
      </InformationContainer>
      {children}
    </StepContainer>
  );
}
GisterStep.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  stepNumber: PropTypes.string,
};
export default GisterStep;

const StepContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;

const InformationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: start;
  margin-bottom: 56px;
`;

const StepNumber = styled.div`
  font-size: 3.438rem;
  font-weight: 200;
  font-family: "Poppins";
  color: #84a4fc;
`;

const Title = styled.span`
  font-size: 1.5rem;
`;

const SubTitle = styled.span``;

const Text = styled.div`
  width: fit-content;
  border-bottom: 1px solid #cecece;
  padding-bottom: 1rem;
  font-weight: 500;
  padding-inline-end: 1.5rem;
`;
