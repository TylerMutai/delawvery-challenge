import React, {useCallback} from 'react';
import {Select} from "@chakra-ui/react";
import strings from "../utils/localization/main";
import {getSelectedLanguage, setLanguage} from "../utils/helpers/language";

const languages = {
  en: "English",
  he: "עברית"
}

function LanguageSwitch() {
  const handleChange = useCallback((e) => {
    setLanguage(e.target.value);
  }, [])

  return (
    <Select borderColor={"black"} w={"150px"} placeholder={strings.select_language} value={getSelectedLanguage()}
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