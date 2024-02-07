import { useContext } from "react";
import { questionnaireContext } from "../providers/QuestionnaireProvider";
import Question from "../components/Questionnaire/Question";
const clinics = ["clalit", "meuhedet", "maccabi", "leumit"];

export default function ClinicPicker() {
  const { updateAnswer, submit } = useContext(questionnaireContext);
  const handleClinicPick = (answerKey) => {
    updateAnswer({ questionKey: "clinicPicker", answerKey });
    submit();
  };
  return (
    <Question
      handleAnswerClick={handleClinicPick}
      answersArray={clinics}
      title="Clinic-Picker-Title"
    />
  );
}
