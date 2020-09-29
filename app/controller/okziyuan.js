"use strict";

const { Controller } = require("egg");

const { searchZiyuan, getHotZyDetail, getHotZiyuan, getVideoList } = require("../specialCrawel/ziyuan");

class OkziyuanController extends Controller {
    async search() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await searchZiyuan(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async detail() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = [];
        let result = await ctx.app.redis.get(ctx.query.url);
        if (result) {
            dataList = JSON.parse(result);
        } else {
            dataList = await getHotZyDetail(ctx, ctx.query);
            for (const item in dataList[0].videoList) {
                if (dataList[0].videoList.hasOwnProperty(item)) {
                    const element = dataList[0].videoList[item];
                    let videoUrl = await getVideoList(element);
                    dataList[0].videoList[item] = videoUrl;
                }
            }
            await ctx.app.redis.set(dataList[0].url, JSON.stringify(dataList), "EX", 86400);
        }

        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async getHotData() {
        const { ctx } = this;
        let dataList = await getHotZiyuan(ctx);

        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }
}

module.exports = OkziyuanController;
