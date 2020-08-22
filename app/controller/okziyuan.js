"use strict";

const { Controller } = require("egg");

const {
    getZiyuan,
    searchZiyuan,
    getNewZiyuan,
    parseFilmGetData,
} = require("../specialCrawel/ziyuan");

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

    async newz() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await getNewZiyuan(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async viewz() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await getZiyuan(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async detail() {
        const { ctx } = this;
        console.log(ctx.query);
        let dataList = await parseFilmGetData(ctx, ctx.query);
        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }

    async getAllData() {
        const { ctx } = this;
        let dataList = ctx.app.parseZiyuanData;

        ctx.body = {
            code: 200,
            message: "success",
            data: dataList,
        };
    }
}

module.exports = OkziyuanController;
