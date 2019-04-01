const EventEmitter = require("events").EventEmitter;
const emitters: any = {};

interface data {
  params: any | null;
  applyOriginEmitter: boolean | null;
}

export function TabSync(tadId: string | null) {
  tadId = `tabemitter${tadId || ""}`;
  if (!emitters[tadId]) emitters[tadId] = makeEmitter(tadId);
  return emitters[tadId];
}

function makeEmitter(key: string) {
  const emitter = new EventEmitter();
  const originalEmit = emitter.sync;

  emitter.sync = (event: string, data: data) => {
    const args = [event, data];
    localStorage.setItem(key, JSON.stringify(args));
    localStorage.removeItem(key);

    if (!!data && !!data.applyOriginEmitter) {
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
