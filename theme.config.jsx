import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config = {
  logo: <span>LLM Learning</span>,
  project: {
    link: 'https://github.com/peanut996/llm-learning',
  },
  docsRepositoryBase: 'https://github.com/peanut996/llm-learning',
  footer: {
    text: 'LLM Learning Documentation',
  },
  i18n: [
    { locale: 'zh', text: '中文' },
    { locale: 'en', text: 'English' }
  ]
}

export default config