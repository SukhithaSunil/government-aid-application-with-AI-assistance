import {CacheProvider} from '@emotion/react'
import {useSelector} from 'react-redux'
import {LANGUAGE_TO_DIRECTION} from '../util/constants'
import createCache from '@emotion/cache'
import rtlPlugin from 'stylis-plugin-rtl'
import {prefixer} from 'stylis'

export const RTLProvider = ({children}) => {
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
    prepend: true,
  })

  const cacheLtr = createCache({
    key: 'mui',
    prepend: true,
  })

  const {currentLanguage} = useSelector((state) => state.language)
  const direction = LANGUAGE_TO_DIRECTION[currentLanguage]
  const selectedCache = direction === 'rtl' ? cacheRtl : cacheLtr

  if (typeof document !== 'undefined') {
    document.body.setAttribute('dir', direction)
  }

  return (
    <CacheProvider value={selectedCache}>
      <div dir={direction}>{children}</div>
    </CacheProvider>
  )
}
