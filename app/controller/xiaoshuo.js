"use strict";

const { Controller } = require("egg");

const {
    serachXiaoshuo,
    biqugeSearch,
    xiaoshuozhangjie,
    zhangjieDetail,
} = require("../specialCrawel/xiaoshuo");

class XiaoshuoController extends Controller {
    async search() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await biqugeSearch(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async searchzhangjie() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await xiaoshuozhangjie(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async zhangjieDetail() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await zhangjieDetail(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }
}

module.exports = XiaoshuoController;
