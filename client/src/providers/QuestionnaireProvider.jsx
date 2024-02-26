import { useRef } from "react";
import PropTypes from "prop-types";
import { useUser } from "./UserProvider";
import { useNavigate, useParams } from "react-router-dom";
import Question from "../components/Questionnaire/Question";
import questions from "../data/question";

export default function QuestionnaireProvider() {
  const { updateQuestionaireAnswers, Questionnaires } = useUser();
  const answers = useRef(Questionnaires);
  const navigate = useNavigate();
  const { questionKey } = useParams();
  const { title, answersOptions, Media } = questions[questionKey];

  const updateAnswer = ({ questionKey, answerKey }) => {
    answers.current[questionKey] = answerKey;
  };

  const submit = () => {
    updateQuestionaireAnswers(answers.current);
  };

  const handleAnswerClick = ({ key, next, end }) => {
    updateAnswer({ questionKey, answerKey: key });
    if (end) submit();
    navigate(`../${next}`);
  };

  return (
    <Question
      answers={answers}
      handleAnswerClick={handleAnswerClick}
      title={title}
      answersOptions={answersOptions}
      Media={Media}
      selectedKey={answers.current[questionKey]}
    />
  );
}

QuestionnaireProvider.propTypes = {
  children: PropTypes.node,
};
