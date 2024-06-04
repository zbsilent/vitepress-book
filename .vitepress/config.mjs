import { defineConfig } from "vitepress";
import { set_sidebar } from "./utils/auto_sidebar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepress-book/",

  head: [["link", { rel: "icon", href: "/vitepress-book/Macao.ico" }]],
  title: "Sictransitgloriamund",
  description: "Personal library",

  themeConfig: {
    outlineTitle: "目录",
    outline: [1, 6],
    logo: "/mac.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
      { text: "React", link: "/font-end/react/" },
      { text: "两边栏演示", link: "/两边栏演示" },
      {
        text: "Vue",
        items: [
          { text: "Vue", link: "/font-end/react/" },
          { text: "Vue3", link: "/font-end/react/" },
        ],
      },
    ],
    // sidebar: false,
    // aside: "left",

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }

    // ],
    sidebar: {"/font-end/react":set_sidebar("font-end/react")},

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    footer: {
      copyright: "© 2024 zbsilent, All rights reserved.",
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
          },
          modal: {
            noResultsText: "没有找到结果",
            resetButtonTitle: "重置搜索",
            footer: {
              selectText: "选择",
              navigateText: "导航",
            },
          },
        },
      },
    },
  },
});
