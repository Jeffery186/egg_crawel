"use strict";

const { Controller } = require("egg");
const rss = require("../specialCrawel/rss");

class RssController extends Controller {
    async index() {
        const { ctx } = this;
        console.log(ctx.query);
        const dataList = await rss.getRssResult(ctx.query.url);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }
}

module.exports = RssController;
