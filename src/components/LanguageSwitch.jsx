import React, {useCallback, useState} from 'react';
import {Select} from "@chakra-ui/react";
import strings from "../utils/localization/main";

const languages = {
  en: "English",
  he: "Hebrew"
}

function LanguageSwitch(props) {
  const [language, setLanguage] = useState("en");

  const handleChange = useCallback((ln) => {
    setLanguage(ln);
  }, [])

  return (
    <Select borderColor={"black"} w={"150px"} placeholder={strings.select_language} value={language}
            onChange={handleChange}>
      {
        Object.keys(languages).map(k => (
          <option key={k} value={k}>{languages[k]}</option>
        ))
      }
    </Select>
  );
}

export default LanguageSwitch;