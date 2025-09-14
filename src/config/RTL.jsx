import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import {CacheProvider} from '@emotion/react'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

export const RTLProvider = (props) => {
  return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>
}