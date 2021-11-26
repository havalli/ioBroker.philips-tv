"use strict";
///
/// Stellt einen Promise-Wrapper für asynchrone Node-Funktionen zur Verfügung
///
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function promisify(fn, context) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        context = context || this;
        return new Promise(function (resolve, reject) {
            fn.apply(context, __spreadArrays(args, [function (error, result) {
                    if (error) {
                        return reject(error);
                    }
                    else {
                        return resolve(result);
                    }
                }]));
        });
    };
}
exports.promisify = promisify;
function promisifyNoError(fn, context) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        context = context || this;
        return new Promise(function (resolve) {
            fn.apply(context, __spreadArrays(args, [function (result) {
                    return resolve(result);
                }]));
        });
    };
}
exports.promisifyNoError = promisifyNoError;
function waterfall() {
    var fn = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fn[_i] = arguments[_i];
    }
    // Führt eine Reihe von Promises sequentiell aus
    // TODO: Rückgabewerte prüfen (ob da was zu viel ist)
    return fn.reduce(function (prev, cur) { return prev.then(cur); }, Promise.resolve());
}
exports.waterfall = waterfall;
/** Creates a promise that waits for the specified time and then resolves */
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
exports.wait = wait;
