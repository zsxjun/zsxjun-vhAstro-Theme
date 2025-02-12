import dayjs from "dayjs";
// 获取文章的描述
const getDescription = (post: any, num: number = 150) => (post.rendered ? post.rendered.html.replace(/<[^>]+>/g, "").replace(/\s+/g, "") : post.body.replace(/\n/g, "").replace(/#/g, "")).slice(0, num) || '暂无简介'
//处理时间
const fmtTime = (time: any, fmt: string = 'MMMM D, YYYY') => dayjs(time).format(fmt)
// 处理日期
const fmtDate = (time: any) => {
  const past = dayjs(time);
  const now = dayjs();
  const duration = now.diff(past, 'seconds');
  if (duration < 60) {
    return `${duration} 秒前`;
  } else if (duration < 60 * 60) {
    const minutes = Math.floor(duration / 60);
    return `${minutes} 分钟前`;
  } else if (duration < 60 * 60 * 24) {
    const hours = Math.floor(duration / (60 * 60));
    return `${hours} 小时前`;
  } else if (duration < 60 * 60 * 24 * 30) {
    const days = Math.floor(duration / (60 * 60 * 24));
    return `${days} 天前`;
  } else if (duration < 60 * 60 * 24 * 30 * 12) {
    const months = Math.floor(duration / (60 * 60 * 24 * 30));
    return `${months} 个月前`;
  } else {
    const years = Math.floor(duration / (60 * 60 * 24 * 30 * 12));
    return `${years} 年前`;
  }
}
// 处理页码展示
const fmtPage = (page: string | undefined) => page ? page.replace(/\//g, '') : null
// 加载外部脚本
const LoadScript = (src: string): Promise<HTMLScriptElement> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}
// 加载外部CSS
const LoadStyle = (href: string): Promise<HTMLLinkElement> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = href;
    link.onload = () => resolve(link); // CSS 加载成功
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`)); // CSS 加载失败
    document.head.appendChild(link); // 将 <link> 添加到文档中
  });
}

// 请求封装
const $GET = async (url: string, headers: Record<string, string> = {}): Promise<any> => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("GET request failed:", error);
    throw error; // 抛出错误以便调用者处理
  }
};

const $POST = async (url: string, data: Record<string, any>, headers: Record<string, string> = {}): Promise<any> => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { ...headers, },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json(); // 解析 JSON 数据
  } catch (error) {
    console.error("POST request failed:", error);
    throw error; // 抛出错误以便调用者处理
  }
};




export { $GET, $POST, getDescription, fmtTime, fmtDate, fmtPage, LoadScript, LoadStyle }