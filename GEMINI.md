# GEMINI.md

This file provides guidance to GEMINI cli when working with code in this repository.

## Project Overview

This is a bilingual (Chinese/English) learning hub built with Next.js 15, Nextra 4, and Tailwind CSS 4. The site hosts educational content on two main topics:
- **LLM (Large Language Models)**: Comprehensive learning materials covering 10 chapters from basics to advanced concepts
- **Interview Preparation**: Technical interview questions for Java, MySQL, Redis, RocketMQ, Spring, MyBatis, and more

## Common Commands

### Development
```bash
pnpm dev              # Start dev server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm debug            # Start dev server with Node.js inspector
```

### Analysis & Type Checking
```bash
pnpm analyze          # Build with bundle analyzer
pnpm types:check      # Run TypeScript type checking
```

### Post-build
After building, Pagefind automatically generates a search index at `public/_pagefind` from the built site content.

## Architecture

### Content Organization
Content lives in `content/{locale}/{topic}/` with matching `_meta.js` files for navigation:
- `content/zh/` - Chinese content
- `content/en/` - English content
- Each topic folder has a `_meta.js` that defines navigation labels and ordering

Example structure:
```
content/
├── zh/
│   ├── _meta.js          # Top-level navigation
│   ├── index.md          # Homepage
│   ├── llm/
│   │   ├── _meta.js      # LLM section navigation
│   │   └── chapter01_llm_overview.md
│   └── interview/
│       ├── _meta.js      # Interview section navigation
│       └── java-basics.md
└── en/                   # Mirror structure for English
```

### Internationalization (i18n)
- Uses Nextra's built-in i18n with middleware (`middleware.ts`)
- Locale configuration in `app/_dictionaries/i18n-config.ts`
- Supported locales: `en` (default), `zh`
- URL structure: `/{locale}/{topic}/{page}` (e.g., `/zh/llm/chapter01_llm_overview`)
- Theme i18n config in `theme.config.jsx`

### Routing & Pages
- Dynamic routing via `app/[lang]/[[...mdxPath]]/page.tsx`
- Uses Nextra's `generateStaticParamsFor()` and `importPage()` for SSG
- MDX components configured in `mdx-components.ts`

### Styling
- Tailwind CSS 4 with PostCSS config
- Custom styles in `app/[lang]/styles.css`
- Feature-specific styles in `app/_components/features.css`

### SVG Handling
Custom webpack/turbopack config for SVG:
- SVG files in `app/_icons/` are loaded via `@svgr/webpack`
- Allows importing SVGs as React components
- Resource query `?svgr` for inline SVG usage

### Search
Pagefind generates a static search index post-build from `.next/server/app` to `public/_pagefind`. This provides client-side full-text search without a backend.

## Adding New Content

1. Create markdown file in `content/{locale}/{topic}/`
2. Update corresponding `_meta.js` with the new page's slug and display name
3. Use Nextra's MDX features: LaTeX math, code highlighting, callouts
4. For bilingual content, maintain parallel structure in both `zh/` and `en/`

## Interview Questions Guidelines

When answering interview questions, follow these best practices:

0. **⚠️ CRITICAL: Answer ONE Question at a Time**
   - **NEVER batch multiple questions in a single edit**
   - **Complete one question fully before moving to the next**
   - Use task tracking to monitor progress across multiple questions
   - This ensures quality, allows for review, and prevents overwhelming edits
   - Example workflow:
     ```
     1. Answer question 1 → Edit file
     2. Mark question 1 as completed
     3. Answer question 2 → Edit file
     4. Mark question 2 as completed
     (Repeat for each question)
     ```

0.5. **File Organization**: Each answer must be in a separate file
   - Create individual answer files in `content/zh/interview/{topic}/` directory
   - File naming: use descriptive kebab-case names (e.g., `mybatis-xml-vs-annotation.md`)
   - Each answer file starts with a `###` heading (H3 level)
   - The heading must include the question number (e.g., `### 20. XML 配置和注解开发的区别是什么?`)
   - **NO sub-headings allowed** - Use numbered lists and bold text for formatting instead
   - Example structure:
     ```markdown
     ### 20. XML 配置和注解开发的区别是什么?

     **核心答案**

     1. **配置方式差异**
        - XML: ...
        - 注解: ...

     2. **使用场景**
        ...
     ```

1. **Memorable Answers**: Provide answers that are easy to remember and understand
   - Use clear explanations with practical examples
   - Include mnemonic devices or mental models when helpful
   - Break down complex concepts into digestible parts

2. **Visual Aids**: Add diagrams and visualizations whenever possible
   - Use SVG diagrams to illustrate concepts (e.g., network protocols, data structures, design patterns)
   - **SVG should be embedded directly in markdown without code block wrapping** (write `<svg>...</svg>` directly, not inside ` ```svg ` blocks)
   - **SVG should be compact without unnecessary comments or extra line breaks** (keep it clean and minimal)
   - Include flowcharts for processes and algorithms
   - Add architecture diagrams for system design questions
   - Use sequence diagrams for interactions between components

3. **Code Examples**: Only provide code examples when absolutely necessary
   - Prioritize conceptual explanations and visualizations over code
   - Use code examples only when they significantly aid understanding
   - When included, keep examples concise and focused
   - Add comments to explain key points
   - Prefer pseudo-code or simplified examples when possible

4. **Structure**: Organize answers clearly
   - Start with a concise definition (核心答案)
   - Follow with detailed explanation (详细说明)
   - Include examples and use cases
   - Add visual aids (SVG diagrams, tables, etc.)
   - End with key takeaways (关键要点) and memory aids (记忆口诀)

## Important Notes

- ESLint errors are ignored during builds (`ignoreDuringBuilds: true`)
- LaTeX rendering is enabled via Nextra config
- Default copy code button is enabled for all code blocks
- Bundle analysis available via `ANALYZE=true` environment variable
