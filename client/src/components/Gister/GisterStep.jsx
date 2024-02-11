import styled from "styled-components";
import PropTypes from "prop-types";

export default function GisterStep({ children, title, ...props }) {
  return (
    <StepContainer {...props}>
      <Title>{title}</Title>
      <WarpperChildren>{children}</WarpperChildren>
    </StepContainer>
  );
}

GisterStep.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

const StepContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border: solid 1px #dadada;
  border-radius: 20px;
  &.invalid {
    border-color: var(--invalid);
  }
`;

const WarpperChildren = styled.div`
  padding-inline: 50px;
  padding-block: 38px;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  padding-inline: 50px;
  border-bottom: 1px solid #cecece;
  padding-block-start: 1.875rem;
  padding-block-end: 1.4375rem;
`;
