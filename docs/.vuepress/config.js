import { defaultTheme } from 'vuepress'

export default {
  base: "/HansBlog/",
  lang: 'zh-CN',
  title: '方行的博客',
  description: '欢迎来到方行的博客',
  theme: defaultTheme({
    // 在这里进行配置
    navbar: [
      // NavbarItem
      {
        text: '首页',
        link: '/',
      },
      {
        text: '算法',
        link: '/Algorithm/',
      },
      {
        text: '数据结构',
        link: '/DataStructure/',
      },
      {
        text: '计算机网络',
        link: '/network/',
      },
      {
        text: '操作系统',
        link: '/OperatingSystem/',
      },
    ],
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar: {
      '/Algorithm/': [
        {
          text: '算法',
          children: [
              {
                text: '第 46 届 ICPC 国际大学生程序设计竞赛亚洲区域赛（上海）--- I-Steadily Growing Steam（背包dp）',
                link: '/Algorithm/第 46 届 ICPC 国际大学生程序设计竞赛亚洲区域赛（上海）--- I-Steadily Growing Steam（背包dp）.md',
              },
              {
                text: '在Jekyll中创建一个新的列表页面',
                link: '/network/在Jekyll中创建一个新的列表页面.md',
              }
            ],
        },
      ],
      '/network/': [
        {
          text: '网络',
          children: [
              {
                text: '一张图帮你看懂，在浏览器输入网址回车后，都发生了什么？',
                link: '/network/一张图帮你看懂，在浏览器输入网址回车后，都发生了什么？.md',
              },
              {
                text: '在Jekyll中创建一个新的列表页面',
                link: '/network/在Jekyll中创建一个新的列表页面.md',
              }
            ],
        },
      ],
    },    

  }),
}
