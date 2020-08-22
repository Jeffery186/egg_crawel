"use strict";
const axios = require("axios");
// 小鸡词典 热门搜索
const jikipedia = async (ctx) => {
    ctx.app.logger.info("小鸡词典 抓取 => begin");
    try {
        let dataList = []
        // 通过api获取
        let response = await axios.post("https://api.jikipedia.com/go/get_hot_search", {});
        let data = response.data.data;
        for (let i = 0; i < data.length; i++){
            let title = data[i].phrase;
            let url = `https://jikipedia.com/search?phrase=${encodeURIComponent(
                title
            )}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "小鸡词典",
                tag: "热门搜索",
                bigType: "娱乐",
            });
        }

        ctx.app.saveCrawel(`小鸡词典 热门搜索`, dataList);
        // return dataList;

        // await page.close();
        // await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        // await page.close();
        // await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = jikipedia;
