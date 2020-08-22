"use strict";

const { Controller } = require("egg");
const wxgzh = require("../specialCrawel/wxgzh");

class WxgzhController extends Controller {
    async index() {
        const { ctx } = this;
        console.log(ctx.query);
        // noinspection UnnecessaryLocalVariableJS
        const dataList = await wxgzh(ctx, ctx.query.search);
        ctx.body = dataList;
    }
}

module.exports = WxgzhController;
