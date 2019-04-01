"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = require("events").EventEmitter;
var emitters = {};
function TabSync(tadId) {
    tadId = "tabemitter" + (tadId || "");
    if (!emitters[tadId])
        emitters[tadId] = makeEmitter(tadId);
    return emitters[tadId];
}
exports.TabSync = TabSync;
function makeEmitter(tadId) {
    var emitter = new EventEmitter();
    var originalEmit = emitter.emit;
    emitter.sync = function (event, data) {
        var args = [event, data];
        localStorage.setItem(tadId, JSON.stringify(args));
        localStorage.removeItem(tadId);
        if (!!data && !!data.applyOriginEmitter) {
            return originalEmit.apply(emitter, args);
        }
    };
    window.addEventListener("storage", function (ev) {
        if (ev.key === tadId && ev.newValue) {
            var args = JSON.parse(ev.newValue);
            originalEmit.apply(emitter, args);
        }
    });
    return emitter;
}
