import { createContext, useRef } from "react";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";

export const questionnaireContext = createContext();

export default function QuestionnaireProvider() {
  const { updateQuestionaireAnswers } = useUser();
  const answers = useRef({});
  const navigate = useNavigate();

  const updateAnswer = ({ questionKey, answerKey }) => {
    answers.current[questionKey] = answerKey;
  };

  const submit = () => {
    updateQuestionaireAnswers(answers.current);
    navigate("../Video");
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
