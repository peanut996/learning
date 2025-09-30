import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config = {
  logo: <span>Learning Hub</span>,
  project: {
    link: 'https://github.com/peanut996/llm-learning',
  },
  docsRepositoryBase: 'https://github.com/peanut996/llm-learning',
  footer: {
    text: 'Learning Hub Documentation',
  },
  i18n: [
    { locale: 'zh', text: '中文' },
    { locale: 'en', text: 'English' }
  ]
}

export default config