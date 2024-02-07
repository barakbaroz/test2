import { useContext } from "react";
import { questionnaireContext } from "../providers/QuestionnaireProvider";
import { useNavigate } from "react-router-dom";
import Question from "../components/Questionnaire/Question";

const answers = ["Yes", "Not-Yet"];

export default function PurchaseQuestion() {
  const { updateAnswer } = useContext(questionnaireContext);
  const navigate = useNavigate();
  const handleAnswerClick = (answerKey) => {
    updateAnswer({ questionKey: "purchasedMedicine", answerKey });
    navigate("../taking-medication");
  };
  return (
    <Question
      handleAnswerClick={handleAnswerClick}
      answersArray={answers}
      title="Purchased-Medicine-Question"
      lottieName="perscription"
    />
  );
}
