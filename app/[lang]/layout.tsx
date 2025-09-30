/* eslint-env node */
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

export const metadata: Metadata = {
  description:
    'Personal learning hub for technical knowledge, including LLM, deep learning, and more.',
  title: {
    absolute: '',
    template: '%s | Learning Hub'
  },
  metadataBase: new URL('https://learning.peanut996.dev'),
  appleWebApp: {
    title: 'Learning Hub'
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
        <span className="select-none font-extrabold">
          Learning Hub
        </span>
      }
      projectLink="https://github.com/peanut996/learning"

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
          nextThemes={{ defaultTheme: 'light' }}
          lastUpdated={<LastUpdated>{dictionary.lastUpdated}</LastUpdated>}
          themeSwitch={{
            dark: dictionary.dark,
            light: dictionary.light,
            system: dictionary.system
          }}
          docsRepositoryBase='https://github.com/peanut996/learning/blob/master'
          feedback={{
            content: dictionary.feedbackContent,
            link: "https://github.com/peanut996/learning/issues/new?title=Feedback%20for%20%E2%80%9CTheme%20Configuration%E2%80%9D&labels=feedback"
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout
