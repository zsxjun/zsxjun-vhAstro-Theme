import Lenis from "lenis";

const IncludeClassName = ['.vh-search.active .vh-search-list', '.aplayer-list>ol', '.vh-code-box>pre'];
let scrollStatus: any = null;
let clearTimer: any = null;
(window as any).vhlenis = new Lenis({
  prevent: (node) => {
    const res = IncludeClassName.some((i: string) => {
      if (node.querySelector('main') || (node.tagName.toLowerCase() === 'main' && !node.parentElement!.classList.contains('active'))) return null;
      scrollStatus = node.querySelector(i) ? node : null;
      if (i.includes('vh-code-box>pre')) {
        try {
          scrollStatus = (node.querySelector(i)!.clientHeight == 888) ? node : null;
          if (node.querySelector(i)!.clientHeight == 888) {
            clearTimeout(clearTimer);
            (window as any).vhlenis.stop();
            clearTimer = setTimeout(() => {
              (window as any).vhlenis.start();
            }, 566);
          }
        } catch {
          scrollStatus = null;
        }
      }
      return scrollStatus;
    })
    return res;
  }
});
const lenisInit = (time: any) => {
  (window as any).vhlenis.raf(time)
  requestAnimationFrame(lenisInit)
}
(window as any).vhlenis.on('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    (window as any).vhlenis.stop();
    (window as any).vhlenis.start();
  }
});

export default () => requestAnimationFrame(lenisInit)