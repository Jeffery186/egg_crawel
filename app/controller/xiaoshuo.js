"use strict";

const { Controller } = require("egg");

const { serachXiaoshuo } = require("../specialCrawel/xiaoshuo");
const { searchManHua } = require("../specialCrawel/manhua");

class XiaoshuoController extends Controller {
    async search() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await serachXiaoshuo(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }
}

module.exports = XiaoshuoController;
