import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const procedureMapper = {
  "atrial-fibrillation": { caseKey: "AtrialFibrillation", project: { id: 1 } },
  "heart-failure": { caseKey: "HeartFailure", project: { id: 17 } },
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

export default function useVideoUrl({ language, type, Case }) {
  const [video, setVideo] = useState({ src: "" });

  const fetch = useCallback(() => {
    const { caseKey, project } = procedureMapper[type];
    const avatar = Case.Avatar;
    avatar.language = languageMapper[language];
    avatar.ethnicity = ethnicityMapper[avatar.ethnicity];
    avatar.hospital = "clalit";
    axios
      .post(
        "https://animator-panel-refactor.oa.r.appspot.com/api/video/v1/requestLink",
        {
          avatar,
          data: Case[caseKey],
          project,
        }
      )
      .then((res) => setVideo(res.data));
  }, [Case, language, type]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { video };
}
