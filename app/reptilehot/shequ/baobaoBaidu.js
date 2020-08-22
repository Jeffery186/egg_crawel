"use strict";

// 宝宝知道 24h热帖榜
const baobaoBaidu = async (ctx) => {
    ctx.app.logger.info("宝宝知道 抓取 => begin");
    const reOptions = await ctx.app.gotoUrl("https://baobao.baidu.com/");
    if (!reOptions) return;
    const $ = reOptions.$;
    const page = reOptions.page;
    const brower = reOptions.brower;
    try {
        let dataList = [];
        const items = $(".todyHotArticle-list .article-title");

        items.each((i, element) => {
            let title = $(element)
                .text()
                .replace(/[ ]|\n/g, "");

            let href = $(element).attr("data-url");

            let url = `https://baobao.baidu.com${href}`;

            dataList.push({
                url,
                title,
                hash: ctx.helper.hash(url),
                createDate: +new Date(),
                reptileName: "宝宝知道",
                tag: "24h热帖榜",
                bigType: "社区",
            });
        });

        ctx.app.saveCrawel(`宝宝知道 24h热帖榜`, dataList);

        await page.close();
        await ctx.app.pool.releaseHs(brower);
    } catch (error) {
        console.log(error);
        await page.close();
        await ctx.app.pool.releaseHs(brower);
    }
};
module.exports = baobaoBaidu;
