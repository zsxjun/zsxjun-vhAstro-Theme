import { LoadScript } from "../utils/index";
import SITE_INFO from "../config";
declare const twikoo: any;
// 初始化评论插件
export default async () => {
  const commentDOM = '.vh-comment>section'
  if (!document.querySelector(commentDOM) || !SITE_INFO.Twikoo.envId) return;
  document.querySelector(commentDOM)!.innerHTML = '<section></section>'
  await LoadScript("https://registry.npmmirror.com/twikoo/1.6.41/files/dist/twikoo.all.min.js");
  twikoo.init({ envId: SITE_INFO.Twikoo.envId, el: commentDOM })
}