
import vh from 'vh-plugin'
import { $GET } from '../utils/index'
// 图片懒加载
import vhLzImgInit from "../scripts/vhLazyImg";

const LinksInit = async () => {
  const linksDOM = document.querySelector('.vh-container>.vh-links>main')
  if (!linksDOM) return;
  vh.showLoading();
  try {
    const res = await $GET('https://tools-api.vvhan.com/blog/link');
    linksDOM.innerHTML = res.map((i: any) => `<a href="${i.link}" target="_blank"><img class="avatar" src="${i.avatar}" /><section class="link-info"><span>${i.name}</span><p>${i.descr}</p></section></a>`).join('');
    // 图片懒加载
    vhLzImgInit();
  } catch {
    vh.Toast('获取数据失败')
  } finally {
    vh.hideLoading();
  }
}
export default LinksInit;