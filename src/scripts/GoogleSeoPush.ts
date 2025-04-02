import { $POST } from '@/utils/index'
export default async () => {
  await $POST('https://vh-api.4ce.cn/api/seoPush', { url: window.location.href.replace(/\/$/, '') }, { 'Content-Type': 'application/json; charset=utf-8' })
}