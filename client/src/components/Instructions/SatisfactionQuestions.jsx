import { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Translator } from "../Translation";
import SingleQuestion from "./SingleQuestion";
import PropTypes from "prop-types";
import { userContext } from "../../providers/UserProvider";

export default function SatisfactionQuestions() {
  const userInfo = useContext(userContext);
  const { satisfactionAnswer } = userInfo.Case.CasesProgress;
  const [state, setState] = useState("none");

  if (satisfactionAnswer) {
    return <></>;
  }

  // First stage when someone clicked the video so the question is popping.
  if (state === "none")
    return (
      <SingleQuestion
        questionKey="video-helpful"
        onAnswer={() => setState("answered")}
      />
    );

  // Second stage when the first question is answered.
  if (state === "answered")
    return (
      <ThanksTitle id="ThanksTitle">
        <Translator>Satisfaction-Response</Translator>
      </ThanksTitle>
    );
}

SatisfactionQuestions.propTypes = {
  videoStarted: PropTypes.bool,
};

const fadeIn = keyframes`
from { opacity: 0;}
to { opacity: 1;}
  `;

const ThanksTitle = styled.h3`
  text-align: start;
  animation: ${fadeIn} 3s;
  padding-inline: var(--screen-texts-padding);
  margin-block: 0;
  font-size: 1.1875rem;
  font-weight: 400;
`;
