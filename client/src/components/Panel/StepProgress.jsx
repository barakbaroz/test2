import PropTypes from "prop-types";
import { Fragment } from "react";
import styled from "styled-components";

const texts = {
  openSms: "סמס נפתח",
  avatarSelection: "שאלון נענה",
  watchedVideo: "סרטון נצפה",
};

const dateOptions = { year: "2-digit", month: "2-digit", day: "2-digit" };

const StepProgress = ({ item }) => {
  return (
    <StyledStepProgress id="StyledStepProgress">
      {Object.entries(item.CasesProgress).map(([step, time]) => {
        const isDone = Boolean(time);
        const color = isDone ? "#84a4fc" : "#dddddd";
        return (
          <Fragment key={step}>
            <TextContainer id="TextContainer">
              <Name color={color}>{texts[step]}</Name>
              <Time show={isDone}>
                {new Date(time).toLocaleDateString(undefined, dateOptions)}
              </Time>
            </TextContainer>

            <SingleStepContainer id="SingleStepContainer">
              <OuterCircle color={color}>
                <InnerCircle show={isDone} />
              </OuterCircle>
              <Line color={color} />
            </SingleStepContainer>
          </Fragment>
        );
      })}
    </StyledStepProgress>
  );
};

StepProgress.propTypes = {
  item: PropTypes.object,
};

export default StepProgress;

const Line = styled.div`
  background-color: ${({ color }) => color};
  height: calc(100% - 1.5rem - 4px);
  width: 3px;
`;

const OuterCircle = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 3px solid ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.div`
  width: 65%;
  height: 65%;
  border-radius: 50%;
  background-color: #84a4fc;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

const TextContainer = styled.div`
  padding-left: 0.5rem;
  text-align: end;
  display: flex;
  flex-direction: column;
  gap: 2%;
`;

const Time = styled.div`
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  font-size: 0.875rem;
  color: #84a4fc;
`;

const Name = styled.div`
  font-size: 1.125rem;
  color: ${({ color }) => color};
`;

const SingleStepContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 1rem;
  min-height: 80px;
  &:last-of-type {
    & > ${Line} {
      display: none;
    }
  }
`;

const StyledStepProgress = styled.div`
  display: grid;
  grid-template-columns: auto 75px;
  width: 100%;
  height: 100%;
  grid-column-gap: 5%;
  grid-template-rows: repeat(3, 1fr);
  padding-inline-end: 10%;
  box-sizing: border-box;
`;
