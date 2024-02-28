import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { LanguageContext } from "../components/Translation";
import { useNavigate } from "react-router-dom";

export default function useUserInfo() {
  const { setLanguage, setGender } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({ Case: {}, Questionnaires: {} });
  const navigate = useNavigate();

  const getUserInstructions = (user) => {
    const { AtrialFibrillation, HeartFailure } = user.Case;
    return [
      ...(AtrialFibrillation ? ["atrial-fibrillation"] : []),
      ...(HeartFailure ? ["heart-failure"] : []),
    ].join("-");
  };

  const updateCase = (newData) => {
    setUserInfo((prev) => ({ ...prev, Case: { ...prev.Case, ...newData } }));
    if (newData.Avatar.gender) setGender(newData.Avatar.gender);
    if (newData.language) setLanguage(newData.language);
    return axios.put("/api/user/update", newData);
  };

  const updateQuestionaireAnswers = (questionaireAnswers, sending) => {
    setUserInfo((prev) => ({
      ...prev,
      Questionnaires: {
        ...prev,
        ...questionaireAnswers,
      },
    }));
    axios.post("/api/user/updateQuestionnaire", {
      answers: questionaireAnswers,
      type: questionnairesTypes[sending],
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    setError(false);
    axios
      .get("/api/user/getData")
      .then((res) => {
        res.data.Case.instructions = getUserInstructions(res.data);
        setLanguage(res.data.language);
        setGender(res.data.Case.Avatar.gender);
        setUserInfo(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response?.status === 404) return navigate("/NotFound");
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [navigate, setGender, setLanguage]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { loading, error, userInfo, updateCase, updateQuestionaireAnswers };
}

const questionnairesTypes = {
  first: "clinic",
  second: "medication",
};
