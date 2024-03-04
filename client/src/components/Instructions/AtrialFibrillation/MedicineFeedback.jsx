import styled from "styled-components";
import { Translator } from "../../Translation";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export default function MedicineFeedback({ titleKey }) {
  const { sending } = useParams();
  if (sending !== "second") return <></>;

  return (
    <FeedbackMedicine>
      <Translator>Feedback-Medicine-{titleKey}</Translator>
    </FeedbackMedicine>
  );
}

MedicineFeedback.propTypes = {
  titleKey: PropTypes.string,
};

const FeedbackMedicine = styled.p`
  margin-inline: var(--screen-margin);
  font-size: 1.25rem;
`;
