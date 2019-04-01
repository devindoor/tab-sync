const EventEmitter = require("events").EventEmitter;
let emitters: any = {};

export function TabSync(key: string) {
  key = "tabemitter" + (key || "");
  if (!emitters[key]) emitters[key] = makeEmitter(key);
  return emitters[key];
}

function makeEmitter(key: string) {
  const emitter = new EventEmitter();
  const originalEmit = emitter.emit;

  emitter.emit = (params: any) => {
    const args: any = [].slice.call(params);
    localStorage.setItem(key, JSON.stringify(args));
    localStorage.removeItem(key);

    if (!!args && !!args[1] && !!args[1].applyOriginEmitter) {
      return originalEmit.apply(emitter, args);
    }
  };
  window.addEventListener("storage", ev => {
    if (ev.key === key && ev.newValue) {
      const args = JSON.parse(ev.newValue);
      originalEmit.apply(emitter, args);
    }
  });

  return emitter;
}
