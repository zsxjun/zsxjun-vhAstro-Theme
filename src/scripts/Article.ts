// 灯箱JS初始化======
import "../../public/assets/js/view-image.min.js";
declare const ViewImage: any;
// 灯箱JS初始化======
// Pre 滚动条======
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbars } from "overlayscrollbars";
// Pre 滚动条======
// Pre Code 代码复制功能======
let copyText = null;
// Pre Code 代码复制功能======

// 初始化
export default () => {
  // 灯箱JS初始化======
  ViewImage && ViewImage.init("main>.vh-container>article.vh-article-main img.vh-article-img");
  // 灯箱JS初始化======
  // Pre 滚动条======
  document.querySelectorAll("section.vh-code-box>pre.astro-code").forEach((i: any) => {
    OverlayScrollbars(i, { scrollbars: { autoHide: "leave", autoHideDelay: 500, autoHideSuspend: false } });
  });
  // Pre 滚动条======
  // Pre Code 代码复制功能======
  document.querySelectorAll("section.vh-code-box>span.vh-code-copy").forEach((i: any) => {
    i.vhTimer = null;
    i.addEventListener("click", async () => {
      if (i.vhTimer) clearTimeout(i.vhTimer);
      copyText = i.parentElement.querySelector("pre.astro-code code")?.innerText;
      if (!copyText) return;
      await navigator.clipboard.writeText(copyText);
      i.classList.add("success");
      i.vhTimer = setTimeout(() => {
        i.classList.remove("success");
        i.vhTimer = null;
      }, 1000);
    });
  });
  // Pre Code 代码复制功能======
}