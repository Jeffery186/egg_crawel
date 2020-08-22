"use strict";
const { Subscription } = require("egg");
const { manhuaRssHub } = require("../specialCrawel/manhua");

class Reptilehot extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: "1d",
            type: "all",
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        await manhuaRssHub(this.ctx, {
            url: "https://m.gufengmh8.com/manhua/zhenhunjie/",
        });
    }
}

module.exports = Reptilehot;
