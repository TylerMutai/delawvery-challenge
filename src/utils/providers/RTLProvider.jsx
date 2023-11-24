import {CacheProvider} from '@emotion/react'
import createCache from '@emotion/cache'
import rtl from 'stylis-plugin-rtl'
import {getSelectedLanguage} from "../helpers/language";
import strings from "../localization/main";


const options = {
  rtl: {
    key: 'css-he', stylisPlugins: [rtl],
  },
  ltr: {
    key: 'css-en'
  }
}

const supportedLanguages = {
  en: "ltr",
  he: "rtl"
}

export function RtlProvider({children}) {
  const dir = supportedLanguages[getSelectedLanguage()];
  strings.setLanguage(getSelectedLanguage());
  const cache = createCache(options[dir])
  document.dir = dir;
  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  )
}