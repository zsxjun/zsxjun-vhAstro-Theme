import vh from 'vh-plugin'
import { fmtDate } from '@/utils/index'
import { $GET } from '@/utils/index'
// 图片懒加载
import vhLzImgInit from "@/scripts/vhLazyImg";

/* 新增：marked 解析 Markdown */
import { marked } from 'marked';

const TalkingInit = async (data: any) => {
  const talkingDOM = document.querySelector('.main-inner-content>.vh-tools-main>main.talking-main');
  if (!talkingDOM) return;

  try {
    /* 1. 取数据（统一数组） */
    let res = data;
    if (typeof data === 'string') res = await $GET(data);

    /* 2. 字段映射：Issues → 原格式 */
    const list = (res || []).map((i: any) => ({
      avatar: i.user.avatar_url,      // GitHub 头像
      name:   i.user.login,           // GitHub 昵称
      date:   i.created_at,           // 创建时间
      content: marked(i.body || i.title), // Markdown → HTML
      tags:   i.labels.map((l: any) => l.name), // label 当标签
    }));

    /* 3. 渲染（沿用你原来的 DOM 结构） */
    talkingDOM.innerHTML = list
      .map(
        (i: any) => `<article>
          <header>
            <img data-vh-lz-src="${i.avatar}" />
            <p class="info">
              <span>${i.name}</span>
              <time>${fmtDate(i.date)}前</time>
            </p>
          </header>
          <section class="main">${i.content}</section>
          <footer>${i.tags.map((t: string) => `<span>#${t}</span>`).join('')}</footer>
        </article>`
      )
      .join('');

    /* 4. 图片懒加载 */
    vhLzImgInit();
  } catch {
    vh.Toast('获取数据失败');
  }
};

/* 5. 入口：把 api 指向 Issues 代理 */
import TALKING_DATA from "@/page_data/Talking";
const { api, data } = TALKING_DATA;
export default () => TalkingInit(api || data);