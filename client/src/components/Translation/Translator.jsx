import { useContext } from "react";
import PropTypes from "prop-types";
import { LanguagesData } from "./Texts";
import { LanguageContext } from "./LanguageProvider";

function Translator({ children }) {
  const key = children instanceof Array ? children.join("") : children;
  return <>{Translate(key)}</>;
}

export function Translate(key) {
  const { language, gender } = useContext(LanguageContext);
  const newGnder = gender === "other" ? "male" : gender;
  return (
    LanguagesData[language][key] ||
    LanguagesData[language][`${key}-${newGnder}`] ||
    key
  );
}

export const languages = [
  { name: "عربيه", value: "ar" },
  { name: "English", value: "en" },
  { name: "Pусский", value: "ru" },
  { name: "עברית", value: "he" },
];

Translator.propTypes = {
  children: PropTypes.node,
};

export default Translator;
