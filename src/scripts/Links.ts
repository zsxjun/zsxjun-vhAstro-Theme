import vh from 'vh-plugin'
import { $GET } from '@/utils/index'
// 图片懒加载
import vhLzImgInit from "@/scripts/vhLazyImg";

// 统一把远端 v2 格式转成主题需要的结构
const normalize = (remote: any) => ({
  name: remote.title,               // 纸鹿摸鱼处
  link: remote.url,                 // https://blog.zhilu.site/
  avatar: remote.icon,              // https://www.zhilu.site/api/avatar.png
  descr: remote.description         // 纸鹿至麓不知路，支炉制露不止漉
});

// 渲染
const LinksInit = async (data: any) => {
  const linksDOM = document.querySelector('.main-inner-content>.vh-tools-main>main.links-main') as HTMLElement;
  if (!linksDOM) return;

  try {
    let res: any[] = [];

    // 1. 如果直接给了数组就拿来用
    if (Array.isArray(data)) {
      res = data;
    }
    // 2. 如果给了字符串就当作 URL 去拉
    else if (typeof data === 'string') {
      const json = await $GET(data);   // 你的 $GET 已经封装好了
      // 远端格式 { version:'v2', content:[...] }
      res = json.content.map(normalize);
    }
    // 3. 其他情况直接报错
    else {
      throw new Error('links data type error');
    }

    // 拼 HTML
    linksDOM.innerHTML = res.map((i: any) =>
      `<a href="${i.link}" target="_blank" rel="noopener">
         <img class="avatar" src="${i.avatar}" alt="${i.name}" />
         <section class="link-info">
           <span>${i.name}</span>
           <p class="vh-ellipsis line-2">${i.descr}</p>
         </section>
       </a>`
    ).join('');

    // 懒加载
    vhLzImgInit();
  } catch {
    vh.Toast('获取数据失败');
  }
};

/* ===== 只改这一行：把远端地址传进去 ===== */
export default () => LinksInit('https://friends-api.kemeow.top/v2/data.json');