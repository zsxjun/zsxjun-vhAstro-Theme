import SITE_CONFIG from "../config";
const { vhMusicApi } = SITE_CONFIG;
import { $GET } from '../utils/index'
import { LoadScript, LoadStyle } from "../utils/index";

declare const APlayer: any;
const musicInit = async (musicList: any[]) => {
  const musicDOM: any = document.querySelectorAll(".vh-node.vh-vhMusic");
  if (musicDOM.length === 0) return;
  // 载入依赖
  await LoadStyle("https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/aplayer/1.10.1/APlayer.min.css");
  await LoadScript("https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/aplayer/1.10.1/APlayer.min.js");
  musicDOM.forEach(async (container: any) => {
    const { type, id, list } = container.dataset;
    const audio = await $GET(`${vhMusicApi}?server=${type}&type=${id ? 'song' : 'playlist'}&id=${id ? id : list}&r=${Math.random()}`);
    const ap = new APlayer({ container, audio, lrcType: 3 });
    musicList.push(ap);
  });
};

export default musicInit;

