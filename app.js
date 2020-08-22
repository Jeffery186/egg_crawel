"use strict";

const initPuppeteerPool = require("./app/util/puppteer_pool");
require("./app/util/ela_search");
const { EventEmitter } = require("events");

const fs = require("fs").promises;
const path = require("path");

EventEmitter.defaultMaxListeners = 30;
class AppBootHook {
    constructor(app) {
        this.app = app;
    }
    async didLoad() {
        // 所有的配置已经加载完毕
        // 可以用来加载应用自定义的文件，启动自定义的服务
        this.app.pool = initPuppeteerPool({
            puppeteerArgs: {
                headless: true,
                args: [
                    "--disable-gpu",
                    "--disable-dev-shm-usage",
                    "--disable-setuid-sandbox",
                    "--no-first-run",
                    "--no-sandbox",
                    "--no-zygote",
                    // "--single-process",
                    "--start-maximized",
                    "--use-gl=swiftshader",
                    "--disable-gl-drawing-for-tests",
                ],
                ignoreDefaultArgs: ["--enable-automation"],
            },
        });
        let filePath = path.join(__dirname, "config.json");
        fs.readFile(filePath, { encoding: "utf-8" }).then((resdata) => {
            this.app.mapZiyuan = new Map();
            this.app.parseZiyuanData = JSON.parse(resdata);

            this.app.parseZiyuanData.map((res) => {
                this.app.mapZiyuan[res.key] = res;
            });
        });

        // await this.app.runSchedule("reptile_hot");
        // await this.app.runSchedule("proxy_pool");
        // await this.app.runSchedule("reptile_manhua");
    }
    async beforeClose() {
        if (this.app.pool.drain) {
            await this.app.pool.drain().then(() => this.app.pool.clear());
        }
    }
}
module.exports = AppBootHook;
