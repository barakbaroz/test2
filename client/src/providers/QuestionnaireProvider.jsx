import { createContext, useRef } from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { useUser } from "./UserProvider";

export const questionnaireContext = createContext();

export default function QuestionnaireProvider() {
  const { updateQuestionaireAnswers } = useUser();
  const answers = useRef({});

  const updateAnswer = ({ questionKey, answerKey }) => {
    answers.current[questionKey] = answerKey;
  };

  const submit = () => {
    updateQuestionaireAnswers(answers.current);
  };
  return (
    <questionnaireContext.Provider value={{ updateAnswer, submit, answers }}>
      <Outlet />
    </questionnaireContext.Provider>
  );
}

QuestionnaireProvider.propTypes = {
  children: PropTypes.node,
};
