import styled from "styled-components";
import { Translator } from "../../Translation";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useUser } from "../../../providers/UserProvider";

export default function MedicineFeedback() {
  const { sending } = useParams();
  const { Questionnaires } = useUser();
  if (sending !== "second") return <></>;

  const [key, value] = Object.entries(Questionnaires).find(([questionKey]) =>
    ["taking-medication", "why-not-purchased"].includes(questionKey)
  );

  return (
    <FeedbackMedicine>
      <Translator>
        Feedback-Medicine-{key}:{value}
      </Translator>
    </FeedbackMedicine>
  );
}

MedicineFeedback.propTypes = {
  show: PropTypes.bool,
};

const FeedbackMedicine = styled.p`
  margin-inline: var(--screen-margin);
  font-size: 1.25rem;
`;
