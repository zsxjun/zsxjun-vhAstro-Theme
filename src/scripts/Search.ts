import vh from 'vh-plugin'
import { $GET } from '../utils/index'

// 更新数据
let searchJson: any[] = [];
const getSearchJson = async () => (searchJson = await $GET('/vh-search.json'))

// 搜索
const searchFn = async (value: string) => {
  if (searchJson.length < 1) await getSearchJson();
  // 渲染页面
  renderSearch(findAndModifyElements(searchJson, value))
}

// 关键词匹配
const findAndModifyElements = (arr: any[], keyword: string) => {
  if ((keyword || '') == '') return []
  return arr
    .filter(item => item.content.includes(keyword))
    .map(item => {
      const content = item.content;
      const keywordIndex = content.indexOf(keyword);
      const start = Math.max(0, keywordIndex - 50);
      const end = Math.min(content.length, keywordIndex + keyword.length + 50);
      let newContent = content.substring(start, end);
      newContent = newContent.replace(new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g"), `<span>${keyword}</span>`);
      return { ...item, content: newContent };
    });
}

// 渲染页面
let searchHTML = '';
const renderSearch = (arr: any[]) => {
  searchHTML = arr.length < 1 ? '' : arr.map(i => `<a class="vh-search-item" href="${i.url}"><span>${i.title}</span><p>${i.content}</p></a>`).join('');
  document.querySelector('.vh-header>.main>.vh-search>main>.vh-search-list')!.innerHTML = searchHTML;
}

// 截流
let fnTimer: any = null;
const searchInputChange = (v: any) => {
  const value = v.target.value;
  if (fnTimer) clearTimeout(fnTimer);
  fnTimer = setTimeout(() => searchFn(value), 266);
}

export { searchFn, searchInputChange };