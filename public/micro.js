/* ====== 可配置常量 ====== */
const API_URL = 'https://gh-api.zhzsx.cn/v2/repos/zsxjun/github-issues-moments/issues%3Fper_page%3D20/data.json';
const PAGE_SIZE = 10;                                    // 每页条数
const MY_AVATAR = 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg'; // 自定义头像
const MY_NAME   = '许哥';                               // 自定义昵称

/* ====== 工具函数 ====== */
const $ = s => document.querySelector(s);
const formatTime = iso => {
  const d = new Date(iso);
  const now = new Date();
  const sec = Math.floor((now - d) / 1000);
  if (sec < 60) return '刚刚';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} 分钟前`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} 小时前`;
  const day = Math.floor(h / 24);
  if (day < 30) return `${day} 天前`;
  return d.toLocaleDateString();
};

/* ====== Markdown 渲染 ====== */
function md(src) {
  return marked.parse(src, { breaks: true, gfm: true });
}

/* ====== 将 <img> 外包 fancybox ====== */
function wrapFancybox(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  tmp.querySelectorAll('img').forEach(img => {
    if (img.classList.contains('micro-avatar')) return; // 跳过头像
    const a = document.createElement('a');
    a.href = img.src;
    a.className = 'fancybox';
    a.setAttribute('data-fancybox', 'gallery');
    a.setAttribute('data-caption', img.alt || '');
    img.parentNode.insertBefore(a, img);
    a.appendChild(img);
  });
  return tmp.innerHTML;
}

/* ====== 单条渲染 ====== */
function renderItem({ title, body, created_at }) {
  const html = md(body || title);
  const content = wrapFancybox(html);
  return `
    <div class="micro-item">
      <div class="micro-left">
        <img class="micro-avatar" src="${MY_AVATAR}" alt="avatar" />
      </div>
      <div class="micro-right">
        <div class="micro-header">
          <span class="micro-name">${MY_NAME}</span>
          <span class="micro-time">${formatTime(created_at)}</span>
        </div>
        <div class="micro-body">${content}</div>
      </div>
    </div>`;
}

/* ====== 分页 ====== */
let allData = [];
let currentPage = 1;

function renderPage() {
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  $('#micro-list').innerHTML = allData.slice(start, end).map(renderItem).join('');

  /* 等 DOM 插入完成再绑定，防御式 */
  const $fb = $('.fancybox');
  if ($fb.length) $fb.fancybox({ loop: true, animationEffect: 'zoom-in-out' });

  $('#micro-prev').disabled = currentPage === 1;
  $('#micro-next').disabled = end >= allData.length;
}

function changePage(delta) {
  currentPage += delta;
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ====== 入口 ====== */
(async () => {
  try {
    allData = await fetch(API_URL).then(r => r.json());
  } catch {
    allData = [];
  }
  const wrapper = $('#micro-wrapper');
  if (!wrapper) return; // 防御式
  wrapper.innerHTML = `
    <div id="micro-list"></div>
    <div id="micro-pager">
      <button id="micro-prev" onclick="changePage(-1)">上一页</button>
      <span>${Math.ceil(allData.length / PAGE_SIZE)} 页</span>
      <button id="micro-next" onclick="changePage(1)">下一页</button>
    </div>`;
  renderPage();
})();