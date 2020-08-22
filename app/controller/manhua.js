"use strict";

const { Controller } = require("egg");
const fs = require("fs").promises;
const path = require("path");
const {
    searchManHua,
    detailManHua,
    getImages,
    manhuaRssHub,
} = require("../specialCrawel/manhua");

class ManhuaController extends Controller {
    async search() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await searchManHua(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async detail() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await detailManHua(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async getImages() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await getImages(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async rssHub() {
        const { ctx } = this;

        global.appRoot = process.cwd();
        let filePath = path.join(global.appRoot, "zhenhunjie.xml");
        let rssData = await fs.readFile(filePath, { encoding: "utf-8" });
        ctx.set("Content-Type", "text/xml");
        ctx.body = rssData;
    }

    async testRssHub() {
        const { ctx } = this;
        await manhuaRssHub(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
        };
    }
}

module.exports = ManhuaController;
