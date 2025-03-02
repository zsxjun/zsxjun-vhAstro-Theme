import SITE_INFO from "../config";
declare const twikoo: any;
// 初始化评论插件
export default async () => {
  const commentDOM = '.vh-comment>section'
  if (!document.querySelector(commentDOM) || !SITE_INFO.Twikoo.envId) return;
  twikoo.init({ envId: SITE_INFO.Twikoo.envId, el: commentDOM })
}