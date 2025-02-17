import dayjs from "dayjs";
// 获取文章的描述
const getDescription = (post: any, num: number = 150) => (post.rendered ? post.rendered.html.replace(/<[^>]+>/g, "").replace(/\s+/g, "") : post.body.replace(/\n/g, "").replace(/#/g, "")).slice(0, num) || '暂无简介'
//处理时间
const fmtTime = (time: any, fmt: string = 'MMMM D, YYYY') => dayjs(time).format(fmt)
// 处理日期
const fmtDate = (time: string | Date) => {
  const now = dayjs()
  const past = dayjs(time)
  // 计算时间差组件
  const years = now.diff(past, 'year')
  const months = now.diff(past.add(years, 'year'), 'month')
  const days = now.diff(past.add(years, 'year').add(months, 'month'), 'day')
  const hours = now.diff(past, 'hour')
  const minutes = now.diff(past, 'minute')
  const seconds = now.diff(past, 'second')
  // 构建时间差描述
  return [
    years && `${years}年`,
    months && `${months}月`,
    days && `${days}天`,
    !years && !months && hours && `${hours}小时`,
    !years && !months && !days && minutes && `${minutes}分钟`,
    !years && !months && !days && !hours && `${seconds}秒`
  ].filter(Boolean).join('')
}

// 处理页码展示
const fmtPage = (page: string | undefined) => page ? page.replace(/\//g, '') : null
// 加载外部脚本
const LoadScript = (
  src: string,
  attrs?: Array<{ k: string; v: string | boolean }>
): Promise<HTMLScriptElement> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    // 添加自定义属性
    if (attrs?.length) {
      attrs.forEach(({ k, v }) => {
        // 处理不同值类型
        const value = typeof v === "boolean"
          ? (v ? "" : null)  // 布尔值处理为 HTML 标准属性格式
          : String(v);       // 其他类型转为字符串

        if (value !== null) {
          script.setAttribute(k, value);
        }
      });
    }
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};
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