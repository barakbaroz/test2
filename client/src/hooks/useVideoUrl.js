import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const procedureMapper = {
  "atrial-fibrillation": {
    caseKey: "AtrialFibrillation",
    project: { value: "atrial-fibrillation" },
  },
  "heart-failure": {
    caseKey: "HeartFailure",
    project: { value: "heart-failure-community" },
  },
};

const languageMapper = {
  he: "hebrew",
  en: "english",
  ru: "russian",
  ar: "arabic",
  sp: "spanish",
};

const ethnicityMapper = {
  white: "light",
  black: "dark",
};

export default function useVideoUrl({ language, type, Case, Questionnaires }) {
  const [video, setVideo] = useState({ src: "" });

  useEffect(() => {
    const { caseKey, project } = procedureMapper[type];
    const avatar = {
      ...Case.Avatar,
      language: languageMapper[language],
      ethnicity: ethnicityMapper[Case.Avatar.ethnicity],
      hospital: "emek",
    };
    const data = { ...Case[caseKey], Questionnaires };
    axios
      .post(
        "https://animator-panel-refactor.oa.r.appspot.com/api/video/v1/requestLink",
        { avatar, data, project }
      )
      .then((res) => setVideo(res.data));
  }, [Case, Questionnaires, language, type]);

  return { video };
}
