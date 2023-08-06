import axios from "axios";
import PropTypes from "prop-types";
import { useState, createContext, useCallback } from "react";
export const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [language, setLocalLanguage] = useState("he");
  const [gender, setGender] = useState("male");
  const [direction, setDirection] = useState("rtl");

  const setLanguage = useCallback((newLanguage) => {
    setLocalLanguage(newLanguage);
    setDirection(directions[newLanguage]);
  }, []);

  const updateLanguage = (language) => {
    setLanguage(language);
    axios.put(`/api/user/update`, { language });
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        updateLanguage,
        gender,
        setGender,
      }}
    >
      <div dir={direction} style={styledByLanguage[language]}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node,
};

export default LanguageProvider;

const directions = {
  he: "rtl",
  en: "ltr",
  ru: "ltr",
  ar: "rtl",
  sp: "ltr",
};

const styledByLanguage = {
  ru: {
    fontFamily: "Roboto",
  },
  he: {
    fontFamily: "Abraham",
  },
  en: {
    fontFamily: "Abraham",
  },
  ar: {
    fontFamily: "Abraham",
  },
  sp: {
    fontFamily: "Abraham",
  },
};
