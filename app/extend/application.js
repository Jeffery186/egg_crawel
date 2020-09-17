"use strict";
const userAgent = require("../util/user_agents");
const cheerio = require("cheerio");
module.exports = {
    async getPage() {
        const brower = await this.pool.use();
        const page = await brower.newPage();
        page.setDefaultNavigationTimeout(240 * 1000);
        await page.evaluateOnNewDocument(() => {
            const newProto = navigator.__proto__;
            delete newProto.webdriver;
            navigator.__proto__ = newProto;
        });
        await page.evaluateOnNewDocument(() => {
            window.navigator.chrome = {
                runtime: {},
            };
        });
        return {
            page,
            brower,
        };
    },

    async gotoUrl(
        url,
        waitUntil = "domcontentloaded",
        timeout = 2000,
        selector
    ) {
        const { page, brower } = await this.getPage();
        try {
            await Promise.all([
                page.setUserAgent(userAgent.random()),
                page.setJavaScriptEnabled(true), //  允许执行 js 脚本
                page.goto(url, {
                    waitUntil,
                }),
                page.waitFor(timeout),
            ]);
            if (selector) {
                await Promise.all([
                    page.waitForSelector(`${selector}`),
                    page.click(`${selector}`),
                    page.waitFor(2000),
                ]);
            }

            const context = await page.content();
            const $ = cheerio.load(context, {
                ignoreWhitespace: true,
                normalizeWhitespace: true,
            });
            return { $, page, brower };
        } catch (error) {
            console.log(error);
            await page.close();
            await this.pool.releaseHs(brower);
        }
    },

    async saveCrawel(title, crawelData) {
        if (crawelData.length > 0) {
            for (const data of crawelData) {
                const result = await this.mysql.get("crawel", {
                    hash: data.hash,
                });

                if (!result) {
                    if (data.cover && data.cover.length > 500) {
                        data.cover = "";
                    }

                    await this.mysql.insert("crawel", {
                        reptileName: data.reptileName,
                        hash: data.hash,
                        url: data.url,
                        author: data.author,
                        cover: data.cover,
                        title: data.title,
                        heat: data.heat,
                        tag: data.tag,
                        bigType: data.bigType,
                        createDate: this.mysql.literals.now,
                    });
                }
            }

            this.logger.info(`${title}抓取 => end`);
        } else {
            this.logger.info(`${title}=>拉取失败`);
        }
    },
};
