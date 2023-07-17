import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Translator } from "../Translation";
import SingleQuestion from "./SingleQuestion";
import PropTypes from "prop-types";

const SatisfactionQuestions = ({ videoStarted }) => {
  const [state, setState] = useState("none");

  // First stage when someone clicked the video so the question is popping.
  if (state === "none")
    return (
      <SingleQuestion
        questionKey="video-helpful"
        onAnswer={() => setState("answered")}
        show={videoStarted}
      />
    );

  // Second stage when the first question is answered.
  if (state === "answered")
    return (
      <>
        <ThanksTitle id="ThanksTitle">
          <Translator>Satisfaction-Response</Translator>
        </ThanksTitle>
      </>
    );
};

export default SatisfactionQuestions;

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
`;
