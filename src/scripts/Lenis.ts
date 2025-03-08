import Lenis from "lenis";

(window as any).vhlenis = new Lenis();
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