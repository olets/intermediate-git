import * as dotenv from 'dotenv';
dotenv.config()
import { defaultTheme } from 'vuepress';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';

export default {
  head: [
    // Fathom analytics
    [
      "script",
      {
        src: "https://jazzy-skillful.olets.dev/script.js",
        'data-site': "WPAIPFKE",
        'defer': true,
      }
    ],
  ],
  lang: 'en-US',
  title: 'Intermediate Git',
  description: 'Primer for leveling up Git use',
  markdown: {
    code: {
      lineNumbers: false,
    },
    links: {
      externalAttrs: {
        class: "external-link",
        rel: "",
        target: "",
      },
    },
  },
  plugins: [
    docsearchPlugin({
      apiKey: process.env.SEARCH_KEY,
      appId: process.env.APPLICATION_ID,
      indexName: process.env.INDEX_NAME,
    }),
  ],
  theme: defaultTheme({
    contributors: false,
    lastUpdated: false,
    navbar: [
      {
        text: "Roadmap",
        link: "https://github.com/olets/intermediate-git/blob/main/ROADMAP.md",
      },
      {
        text: "Contributing",
        link: "https://github.com/olets/intermediate-git/blob/main/CONTRIBUTING.md",
      },
      {
        text: "License",
        link: "https://github.com/olets/intermediate-git/blob/main/LICENSE",
      },
    ],
    sidebar: {
      "/": [
        {
          children: [
            {
              text: "Introduction",
              link: "/README.md",
            },
            "/create-a-git-playground.md",
            "/finding-out-what-commits-have-been-made.md",
            "/reapplying-work.md",
            "/helping-git-overcome-blocks.md",
          ],
        },
      ],
    },
    sidebarDepth: 3,
    themePlugins: {
      externalLinkIcon: false,
    }
  }),
}