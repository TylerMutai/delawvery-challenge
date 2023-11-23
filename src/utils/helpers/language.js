import strings from "../localization/main";

const LANGUAGE_KEY = "LANGUAGE_KEY";

const supportedLanguages = [
  "en",
  "he"
];

const setLanguage = (lang) => {
  if (supportedLanguages.includes(lang)) {
    localStorage.setItem(LANGUAGE_KEY, lang);
    strings.setLanguage(lang);
    window.location.reload();
  }
}

const getSelectedLanguage = () => {
  const saved = localStorage.getItem(LANGUAGE_KEY);
  if (supportedLanguages.includes(saved)) {
    return saved;
  }
  return "en";
}

export {setLanguage, getSelectedLanguage};