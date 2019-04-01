"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = require("events").EventEmitter;
var emitters = {};
function TabSync(key) {
    key = "tabemitter" + (key || "");
    if (!emitters[key])
        emitters[key] = makeEmitter(key);
    return emitters[key];
}
exports.TabSync = TabSync;
function makeEmitter(key) {
    var emitter = new EventEmitter();
    var originalEmit = emitter.emit;
    emitter.emit = function (params) {
        var args = [].slice.call(params);
        localStorage.setItem(key, JSON.stringify(args));
        localStorage.removeItem(key);
        if (!!args && !!args[1] && !!args[1].applyOriginEmitter) {
            return originalEmit.apply(emitter, args);
        }
    };
    window.addEventListener("storage", function (ev) {
        if (ev.key === key && ev.newValue) {
            var args = JSON.parse(ev.newValue);
            originalEmit.apply(emitter, args);
        }
    });
    return emitter;
}
