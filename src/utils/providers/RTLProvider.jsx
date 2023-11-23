// src/components/rtl-provider.js

import {CacheProvider} from '@emotion/react'
import createCache from '@emotion/cache'
import rtl from 'stylis-plugin-rtl'

// NB: A unique `key` is important for it to work!
const options = {
  rtl: {
    key: 'css-he', stylisPlugins: [rtl],
  },
  ltr: {
    key: 'css-en'
  }
}

// eslint-disable-next-line react/prop-types
export function RtlProvider({children}) {
  const dir = 'ltr'
  const cache = createCache(options[dir])
  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  )
}