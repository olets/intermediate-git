import { defaultTheme } from 'vuepress'

export default {
  lang: 'en-US',
  title: 'Intermediate Git',
  description: 'Primer for leveling up Git use',
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
            "/README.md",
            "/finding-out-what-commits-have-been-made.md",
            "/reapplying-work.md",
          ],
        },
      ],
    },
    sidebarDepth: 3,
  }),
}