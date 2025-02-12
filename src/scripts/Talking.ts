
import vh from 'vh-plugin'
import { $GET } from '../utils/index'
// 图片懒加载
import vhLzImgInit from "../scripts/vhLazyImg";
// 灯箱JS初始化======
import "../../public/assets/js/view-image.min.js";
declare const ViewImage: any;
// 灯箱JS初始化======

const TalkingInit = async () => {
  const talkingDOM = document.querySelector('.vh-container>.vh-talking>main')
  if (!talkingDOM) return;
  vh.showLoading();
  try {
    const res = await $GET('https://tools-api.vvhan.com/blog/feeling');
    talkingDOM.innerHTML = res.map((i: any) => `<article><header><img data-vh-lz-src="https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640" /><p class="info"><span>.𝙃𝙖𝙣</span><time>${i.date}</time></p></header><section class="main">${i.content}</section><footer>${i.tags.map((tag: any) => `<span>${tag}</span>`).join('')}</footer></article>`).join('');
    // 图片懒加载
    vhLzImgInit();
    // 灯箱JS初始化======
    ViewImage && ViewImage.init(".vh-talking>main>article>.main img");
    // 灯箱JS初始化======
  } catch {
    vh.Toast('获取数据失败')
  } finally {
    vh.hideLoading();
  }
}
export default TalkingInit;