import { defineConfig } from "vitepress";
import { set_sidebar } from "./utils/auto_sidebar.mjs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepress-book/",
  head: [["link", { rel: "icon", href: "/vitepress-book/Macao.ico" }]],
  markdown: {
    lineNumbers: true,
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2, 3, 4] },
    extendMarkdown: (md) => {
      // 使用更多的 markdown-it 插件!
      //md.use(require("markdown-it-anchor"));
      //md.use(require("markdown-it-toc"));
    },
  },
  title: "Sictransitgloriamund",
  // prev: true,
  // next: true,
  description: "Personal library",
  // lastUpdated: true,
  themeConfig: {
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    displayAllHeaders: false, // 默认值：false 显示所有页面的链接
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,
    lastUpdated: {
      text: "Updated at",
      timezone: "Asia/Shanghai",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    outlineTitle: "目录",
    outline: [1, 6],
    logo: "/mac.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "示例", link: "/markdown-examples" },
      { text: "后端开发", items: [
        { text: "java", link: "/back-end-development/java/" },
         { text: "spring", link: "/back-end-development/spring/" }
        ] 
      },
      { text: "前端开发", items: [{ text: "React", link: "/front-end-development/react/" }] },
      { text: "工具学习", 
        items: [
          { text: "Docker相关", link: "/tools-development/Docker/" },
          { text: "Git相关", link: "/tools-development/Git" },
          { text: "Mac设置", link: "/tools-development/Mac/" },
          { text: "Md语法", link: "/tools-development/Md/" },
         // { text: "Md语法2", link: "/tools-development/Docker/ddd/" },
        ],
       },
      { text: "两边栏演示", link: "/两边栏演示" },
      {
        text: "下拉测试",
        items: [
          { text: "Vue", link: "/font-end/react/" },
          { text: "React2", link: "/front-end-development/react/" },
        ],
      },
    ],
    /*sidebar: false,
    aside: "left",
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ], */
    sidebar: {
      "/back-end-development/java": set_sidebar("back-end-development/java"),
      "/front-end-development/react": set_sidebar("front-end-development/react"),
      "/back-end-development/spring": set_sidebar("back-end-development/spring"),
      "/tools-development/Docker": set_sidebar("tools-development/Docker"),
      "/tools-development/Git": set_sidebar("tools-development/Git"),
      "/tools-development/Mac": set_sidebar("tools-development/Mac"),
      "/tools-development/Md": set_sidebar("tools-development/Md"),
    },

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
    // 默认是 false, 设置为 true 来启用
    // editLinks: true,
    // 默认为 "Edit this page"
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    },
    // editLinkText: "帮助我们改善此页面！",
  },
});
