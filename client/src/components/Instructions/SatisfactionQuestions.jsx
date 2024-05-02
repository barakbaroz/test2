import { useState } from "react";
import styled from "styled-components";
import { Translator } from "../Translation";
import SingleQuestion from "./SingleQuestion";
import PropTypes from "prop-types";
import { useUser } from "../../providers/UserProvider";
import SatisfactionSection from "./SatisfactionSection";

export default function SatisfactionQuestions({ videoStarted }) {
  const { Case } = useUser();
  const { satisfactionAnswer } = Case.CasesProgress;
  const [state, setState] = useState("none");

  if (satisfactionAnswer || !videoStarted) {
    return <></>;
  }

  // First stage when someone clicked the video so the question is popping.
  if (state === "none")
    return (
      <SatisfactionSection onComplete={() => setState("sec")}>
        <SingleQuestion questionKey="medical-condition" />
      </SatisfactionSection>
    );

  if (state === "sec")
    return (
      <SatisfactionSection onComplete={() => setState("complete")}>
        <ThanksTitle>
          <Translator>Satisfaction-Know-More</Translator>
        </ThanksTitle>
        <SingleQuestion questionKey="important" />
        <SingleQuestion questionKey="taking" />
      </SatisfactionSection>
    );

  // Second stage when the first question is answered.
  if (state === "complete")
    return (
      <SatisfactionSection>
        <ThanksTitle id="ThanksTitle">
          <Translator>Satisfaction-Completed</Translator>
        </ThanksTitle>
      </SatisfactionSection>
    );
}

SatisfactionQuestions.propTypes = {
  videoStarted: PropTypes.bool,
};

const ThanksTitle = styled.h3`
  text-align: start;
  padding-inline: var(--screen-texts-padding);
  margin-block: 0;
  font-size: 1.1875rem;
  font-weight: 500;
  font-size: 1.188;
`;
