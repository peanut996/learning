/* eslint-env node */
import { SwrIcon } from '@app/_icons'
import type { Metadata } from 'next'
import {
  Footer,
  LastUpdated,
  Layout,
  LocaleSwitch,
  Navbar
} from 'nextra-theme-docs'
import {  Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import { getDictionary, getDirection } from '../_dictionaries/get-dictionary'
import './styles.css'
import { link } from 'fs'

export const metadata: Metadata = {
  description:
    'SWR is a React Hooks library for data fetching. SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.',
  title: {
    absolute: '',
    template: '%s | SWR'
  },
  metadataBase: new URL('https://swr.vercel.app'),
  openGraph: {
    images:
      'https://assets.vercel.com/image/upload/v1572282926/swr/twitter-card.jpg'
  },
  twitter: {
    site: '@vercel'
  },
  appleWebApp: {
    title: 'SWR'
  },
  other: {
    'msapplication-TileColor': '#fff'
  }
}

type LayoutProps = Readonly<{
  children: ReactNode
  params: Promise<{
    lang: string
  }>
}>

const RootLayout: FC<LayoutProps> = async ({ children, params }) => {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  let pageMap = await getPageMap(`/${lang}`)

  if (lang === 'en') {
    pageMap = [
      ...pageMap,
    ]
  }
  const navbar = (
    <Navbar
      logo={
        <>
          <SwrIcon height="12" />
          <span
            className="ms-2 select-none font-extrabold max-md:hidden"
          >
            LLM Learning Hub
          </span>
        </>
      }
      projectLink="https://github.com/peanut996/llm-learning"

    >
      <LocaleSwitch lite />
    </Navbar>
  )
  const footer = (
    <Footer>
    </Footer>
  )
  return (
    <html lang={lang} dir={getDirection(lang)} suppressHydrationWarning>
      <Head/>
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          i18n={[
            { locale: 'en', name: 'English' },
            { locale: 'zh', name: '中文' },
          ]}
          sidebar={{
            defaultMenuCollapseLevel: 1,
            autoCollapse: true
          }}
          toc={{
            backToTop: dictionary.backToTop,
          }}
          editLink={dictionary.editPage}
          pageMap={pageMap}
          nextThemes={{ defaultTheme: 'dark' }}
          lastUpdated={<LastUpdated>{dictionary.lastUpdated}</LastUpdated>}
          themeSwitch={{
            dark: dictionary.dark,
            light: dictionary.light,
            system: dictionary.system
          }}
          docsRepositoryBase='https://github.com/peanut996/llm-learning/blob/master'
          feedback={{ link: "https://github.com/peanut996/llm-learning/issues/new?title=Feedback%20for%20%E2%80%9CTheme%20Configuration%E2%80%9D&labels=feedback"}}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout
