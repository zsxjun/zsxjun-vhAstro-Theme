type RouterEventKey = "beforeCreate" | "created" | "beforeMount" | "mounted" | "afterMount";
type RouterEventName = "astro:before-preparation" | "astro:after-preparation" | "astro:before-swap" | "astro:after-swap" | "astro:page-load";
type EventHandler = (event: Event) => void;

// 路由事件映射
const routerFn: Record<RouterEventKey, RouterEventName> = { beforeCreate: 'astro:before-preparation', created: 'astro:after-preparation', beforeMount: 'astro:before-swap', mounted: 'astro:after-swap', afterMount: 'astro:page-load' };

const updateRouter = (key: RouterEventKey, handler: EventHandler) => {
  const eventName = routerFn[key];
  if (!eventName) {
    throw new Error(`Invalid key ${key} for router update. Valid keys are: ${Object.keys(routerFn).join(", ")}.`);
  }
  document.removeEventListener(eventName, handler);
  document.addEventListener(eventName, handler);
};

export default updateRouter;