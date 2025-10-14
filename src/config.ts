export default {
  // 网站标题
  Title: 'ZSXの小站',
  // 网站地址
  Site: 'https://vhastro.zhzsx.cn',
  // 网站副标题
  Subtitle: '造化钟神秀，阴阳割昏晓、',
  // 网站描述
  Description: '钟神秀的博客，我在这个博客里记录我的是生活日常、踩坑记录和资源分享。',
  // 网站作者
  Author: '钟神秀',
  // 作者头像
  Avatar: 'https://img.314926.xyz/images/2025/09/20/zsx-avatar.webp',
  // 网站座右铭
  Motto: '已死之人向赴死者致敬！',
  // Cover 网站缩略图
  Cover: 'https://img.zhzsx.cn/mc-pc',
  // 网站侧边栏公告 (不填写即不开启)
  Tips: '<p>欢迎光临我的博客 🎉我在这个博客分享我的<kbd style="color: #00cbeaff";>生活记录</kbd>、<kbd style="color: #0cf404ff";>踩坑教程</kbd>和<kbd style="color: #eaa400ff";>资源分享</kbd>。</p><p>如果遇到网站的什么问题，优先<kbd style="color: #ea0000";>CTRL</kbd>+<kbd style="color: #ea0000";>F5</kbd>强制刷新一下~</p><p>如果还有什么问题或者建议，优先在<a href="mailto:zsx@zhzsx.cn" target="_blank" rel="noopener noreferrer" style="color: #ea0000";>邮箱</a>联系我~</p>',
  // 首页打字机文案列表
  TypeWriteList: [
    '造化钟神秀，阴阳割昏晓。',
    "已死之人，向赴死者致敬。",
    "总有人间一两风，填我十万八千梦。", 
    "每一段旅行都有终点~",
    "总有些事情高于其他。",
  ],
  // 网站创建时间
  CreateTime: '2025-10-12',
  // 顶部 Banner 配置
  HomeBanner: {
    enable: true,
    // 首页高度
    HomeHeight: '38.88rem',
    // 其他页面高度
    PageHeight: '28.88rem',
    // 背景
    background: "url('https://img.zhzsx.cn/mc-pc') no-repeat center 60%/cover",
  },
  // 博客主题配置
  Theme: {
    // 颜色请用 16 进制颜色码
    // 主题颜色
    "--vh-main-color": "#01C4B6",
    // 字体颜色
    "--vh-font-color": "#34495e",
    // 侧边栏宽度
    "--vh-aside-width": "318px",
    // 全局圆角
    "--vh-main-radius": "0.88rem",
    // 主体内容宽度
    "--vh-main-max-width": "1458px",
  },
  // 导航栏 (新窗口打开 newWindow: true)
  Navs: [
    // 仅支持 SVG 且 SVG 需放在 public/assets/images/svg/ 目录下，填入文件名即可 <不需要文件后缀名>（封装了 SVG 组件 为了极致压缩 SVG）
    // 建议使用 https://tabler.io/icons 直接下载 SVG
    { text: '朋友', link: '/links', icon: 'friends' },
    { text: '圈子', link: '/circle', icon: 'rss' },
    { text: '动态', link: '/talking', icon: 'dongtai' },
    { text: '昔日', link: '/archives', icon: 'Archives' },
    { text: '留言', link: '/message', icon: 'message' },
    { text: '关于', link: '/about', icon: 'about' },
    // { text: 'API', link: 'https://api.vvhan.com/', target: true, icon: 'Nav_link' },
  ],
  // 侧边栏个人网站
  WebSites: [
    // 仅支持 SVG 且 SVG 需放在 public/assets/images/svg/ 目录下，填入文件名即可 <不需要文件后缀名>（封装了 SVG 组件 为了极致压缩 SVG）
    // 建议使用 https://tabler.io/icons 直接下载 SVG
    { text: 'Github', link: 'https://github.com/zsxjun', icon: 'github' },
    { text: 'Telegram', link: 'https://t.me/zhzsx_me', icon: 'telegram' },
    { text: '每日热榜', link: 'https://hot-list.zhzsx.cn', icon: 'News' },
    { text: 'QQ', link: 'https://qm.qq.com/q/Y2AaAdbkku', icon: 'QQ' },
    { text: 'HanAnalytics', link: 'https://analytics.vvhan.com', icon: 'WebSite_analytics' },
  ],
  // 侧边栏展示
  AsideShow: {
    // 是否展示个人网站
    WebSitesShow: true,
    // 是否展示分类
    CategoriesShow: true,
    // 是否展示标签
    TagsShow: true,
    // 是否展示推荐文章
    recommendArticleShow: true
  },
  // DNS预解析地址
  DNSOptimization: [
    'https://i0.wp.com',
    'https://cn.cravatar.com',
    'https://analytics.vvhan.com',
    'https://vh-api.4ce.cn',
    'https://registry.npmmirror.com',
    'https://pagead2.googlesyndication.com'
  ],
  // 博客音乐组件解析接口
  vhMusicApi: 'https://vh-api.4ce.cn/blog/meting',
  // 评论组件（只允许同时开启一个）
  Comment: {
    // Twikoo 评论
    Twikoo: {
      enable: false,
      envId: ''
    },
    // Waline 评论
    Waline: {
      enable: true,
      serverURL: 'https://waline.zhzsx.cn'
    }
  },
  // Han Analytics 统计（https://github.com/uxiaohan/HanAnalytics）
  HanAnalytics: { enable: true, server: 'https://analytic.zhzsx.cn', siteId: 'ZSX-blog' },
  // Google 广告
  GoogleAds: {
    ad_Client: '', //ca-pub-xxxxxx
    // 侧边栏广告(不填不开启)
    // asideAD_Slot: `<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-xxxxxx" data-ad-slot="xxxxxx" data-ad-format="auto" data-full-width-responsive="true"></ins>`,
    asideAD_Slot: ``,
    // 文章页广告(不填不开启)
    // articleAD_Slot: `<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-xxxxxx" data-ad-slot="xxxxxx" data-ad-format="auto" data-full-width-responsive="true"></ins>`
    articleAD_Slot: ``,
  },
  // 文章内赞赏码
  Reward: {
    // 支付宝收款码
    AliPay: 'https://img.314926.xyz/images/2025/09/23/支付宝.webp',
    // 微信收款码
    WeChat: 'https://img.314926.xyz/images/2025/09/23/微信.webp'
  },
  // 访问网页 自动推送到搜索引擎
  SeoPush: {
    enable: false,
    serverApi: '',
    paramsName: 'url'
  },
  // 页面阻尼滚动速度
  ScrollSpeed: 300
}