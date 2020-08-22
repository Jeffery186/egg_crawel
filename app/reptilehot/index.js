"use strict";
const pAll = require("p-all");
const path = require("path");
const requireContext = require("require-context-async");
const yuanjing = require("../reptilehot/keji/yuanjing");

class Crawel {
    constructor() {}
    static async goRun(ctx) {
        const actions = [];
        let fileCache = ctx.app.fileCache;

        if (!fileCache) {
            fileCache = requireContext(
                path.resolve(__dirname, "./"),
                true,
                /\.js$/,
                (item) => {
                    if (item.indexOf("index") == -1) {
                        let task = require(item);
                        actions.push(() => task(ctx));
                    }
                }
            );
        } else {
            fileCache.map((item) => {
                if (item.indexOf("index") == -1) {
                    let task = require(item);
                    actions.push(() => task(ctx));
                }
            });
        }

        await pAll(actions, { concurrency: 2, stopOnError: false });
        ctx.app.fileCache = fileCache;
        // yuanjing(ctx);
    }
}

module.exports = Crawel;
